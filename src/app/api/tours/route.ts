import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import toursEn from "@/data/tours-en.json";
import toursRu from "@/data/tours-ru.json";
import toursUz from "@/data/tours-uz.json";

const allTours = {
  en: toursEn,
  ru: toursRu,
  uz: toursUz
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'uz';
  
  try {
    const result = await query("SELECT * FROM tours ORDER BY created_at DESC");
    
    // Map DB rows to match the JSON schema so frontend TourCard works without modifications
    const dbTours = result.rows.map(row => ({
      id: row.id,
      destination: {
        name: row.target_destination.split(', ')[1] || row.target_destination,
        town: row.target_destination.split(', ')[0] || row.target_destination
      },
      hotel: {
        name: row.hotel_title,
        sourceUrl: null,
        stars: 5,
        rating: 5.0,
        reviewsCount: 100
      },
      package: {
        price: Number(row.price),
        currency: "UZS",
        pricePerPax: Number(row.price) / 2,
        pax: 2
      },
      duration: {
        nights: row.duration_nights,
        checkIn: "",
        checkOut: ""
      },
      included: {
        meal: "", // Can be extended later
        flightIn: row.flight_parameters.toLowerCase().includes('round') || row.flight_parameters.toLowerCase().includes('in'),
        flightOut: row.flight_parameters.toLowerCase().includes('round') || row.flight_parameters.toLowerCase().includes('out'),
        roomType: row.room_categories,
        spo: ""
      },
      imageUrl: row.image_url,
      isComingSoon: row.is_coming_soon
    }));

    const staticTours = allTours[lang as keyof typeof allTours] || toursUz;

    if (searchParams.get('admin') === 'true') {
      return NextResponse.json({
        success: true,
        data: dbTours
      });
    }

    return NextResponse.json({
      success: true,
      data: [...dbTours, ...staticTours]
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
      target_destination, hotel_title, price, duration_nights, 
      room_categories, flight_parameters, image_url, is_coming_soon 
    } = body;

    const result = await query(
      `INSERT INTO tours (
        target_destination, hotel_title, price, duration_nights, 
        room_categories, flight_parameters, image_url, is_coming_soon
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [target_destination, hotel_title, price, duration_nights, room_categories, flight_parameters, image_url, is_coming_soon ?? false]
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
      id, target_destination, hotel_title, price, duration_nights, 
      room_categories, flight_parameters, image_url, is_coming_soon 
    } = body;

    const result = await query(
      `UPDATE tours SET 
        target_destination = $1, hotel_title = $2, price = $3, duration_nights = $4, 
        room_categories = $5, flight_parameters = $6, image_url = $7, is_coming_soon = $8
      WHERE id = $9 RETURNING *`,
      [target_destination, hotel_title, price, duration_nights, room_categories, flight_parameters, image_url, is_coming_soon ?? false, id]
    );

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Failed to update tour:", error);
    return NextResponse.json({ success: false, error: "Failed to update tour" }, { status: 500 });
  }
}
