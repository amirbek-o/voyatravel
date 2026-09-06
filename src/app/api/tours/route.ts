import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import toursEn from "@/data/tours-en.json";
import toursRu from "@/data/tours-ru.json";
import toursUz from "@/data/tours-uz.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'uz';
  
  try {
    const countRes = await query("SELECT COUNT(*) FROM tours");
    const count = parseInt(countRes.rows[0].count, 10);

    if (count === 0) {
      for (let i = 0; i < toursUz.length; i++) {
        const u = toursUz[i] as any;
        const r = toursRu[i] as any;
        const e = toursEn[i] as any;

        const hotelName = u.hotel.name;
        const priceSum = u.package.price;
        const nights = u.duration.nights;
        const destUz = `${u.destination.town}, ${u.destination.name}`;
        const destRu = `${r.destination.town}, ${r.destination.name}`;
        const destEn = `${e.destination.town}, ${e.destination.name}`;
        const imageUrl = u.imageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop";
        const cardStatus = 'Active';
        const roomCategories = u.included.roomType || "Standard Room";
        const flightParams = (u.included.flightIn && u.included.flightOut) ? "Round Trip" : "One Way";

        await query(
          `INSERT INTO tours (
            hotel_name, price_sum, nights, destination_uz, destination_ru, destination_en,
            image_url, card_status, room_categories, flight_parameters
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [hotelName, priceSum, nights, destUz, destRu, destEn, imageUrl, cardStatus, roomCategories, flightParams]
        );
      }
    }

    const result = await query("SELECT * FROM tours ORDER BY created_at ASC");
    
    // Map DB rows to match the JSON schema so frontend TourCard works without modifications
    const dbTours = result.rows.map(row => {
      // Pick the correct localized destination string based on 'lang'
      let destStr = row.destination_uz;
      if (lang === 'en') destStr = row.destination_en;
      if (lang === 'ru') destStr = row.destination_ru;

      const [town, name] = destStr.split(', ');

      return {
        id: row.id,
        destination: {
          name: name || destStr,
          town: town || destStr
        },
        hotel: {
          name: row.hotel_name,
          sourceUrl: null,
          stars: 5,
          rating: 5.0,
          reviewsCount: 100
        },
        package: {
          price: Number(row.price_sum),
          currency: "UZS",
          pricePerPax: Number(row.price_sum) / 2,
          pax: 2
        },
        duration: {
          nights: row.nights,
          checkIn: "",
          checkOut: ""
        },
        included: {
          meal: "",
          flightIn: row.flight_parameters.toLowerCase().includes('round') || row.flight_parameters.toLowerCase().includes('in'),
          flightOut: row.flight_parameters.toLowerCase().includes('round') || row.flight_parameters.toLowerCase().includes('out'),
          roomType: row.room_categories,
          spo: ""
        },
        imageUrl: row.image_url,
        isComingSoon: row.card_status === 'Coming Soon',
        // Also supply raw db fields for the admin edit modal to consume easily
        _raw: row
      };
    });

    return NextResponse.json({
      success: true,
      data: dbTours
    });
  } catch (error) {
    console.error("Failed to fetch tours:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch tours" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      hotel_name, price_sum, nights, destination_uz, destination_ru, destination_en,
      image_url, card_status, room_categories, flight_parameters
    } = body;

    const result = await query(
      `INSERT INTO tours (
        hotel_name, price_sum, nights, destination_uz, destination_ru, destination_en,
        image_url, card_status, room_categories, flight_parameters
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [hotel_name, price_sum, nights, destination_uz, destination_ru, destination_en, image_url, card_status || 'Active', room_categories, flight_parameters]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Failed to create tour:", error);
    return NextResponse.json({ success: false, error: "Failed to create tour" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { 
      id, hotel_name, price_sum, nights, destination_uz, destination_ru, destination_en,
      image_url, card_status, room_categories, flight_parameters
    } = body;

    const result = await query(
      `UPDATE tours SET 
        hotel_name = $1, price_sum = $2, nights = $3, destination_uz = $4, destination_ru = $5, destination_en = $6,
        image_url = $7, card_status = $8, room_categories = $9, flight_parameters = $10
      WHERE id = $11 RETURNING *`,
      [hotel_name, price_sum, nights, destination_uz, destination_ru, destination_en, image_url, card_status || 'Active', room_categories, flight_parameters, id]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Failed to update tour:", error);
    return NextResponse.json({ success: false, error: "Failed to update tour" }, { status: 500 });
  }
}
