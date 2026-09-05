import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, destination, hotelName, price, flightClass, flightType } = body;

    // Validate inputs
    if (!fullName || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Database
    let dbError = false;
    try {
      if (process.env.DATABASE_URL) {
        // Updated schema to match exact Supabase columns: name, hotel, etc.
        await query(
          "INSERT INTO bookings (name, phone, destination, hotel, price, flight_class, flight_type, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [fullName, phone, destination || "Unknown Destination", hotelName || "Unknown", String(price || 0), flightClass, flightType, "Pending"]
        );
      } else {
        console.warn("No DATABASE_URL provided. Skipping DB insert.");
      }
    } catch (e) {
      console.error("Database Save Error:", e);
      dbError = true;
    }

    // Send Telegram Alert (Non-blocking so it doesn't hang the response loop)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const message = `
🌟 *New Premium Booking Request!* 🌟

👤 *Name:* ${fullName}
📞 *Phone:* ${phone}
🏖 *Destination:* ${destination || "Unknown"}
🏨 *Hotel:* ${hotelName || "Unknown"}
💵 *Price:* $${price || 0}
✈️ *Flight Class:* ${flightClass}
🛫 *Flight Type:* ${flightType}
      `;

      // Await the fetch request so Vercel serverless functions don't terminate execution early
      try {
        const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
          })
        });

        if (response.status === 400 || response.status === 403 || !response.ok) {
          const errorText = await response.text();
          console.error(`Telegram API Error ${response.status}:`, errorText);
        }
      } catch (tgError) {
        console.error("Telegram fetch operation failed:", tgError);
      }
    } else {
      console.warn("Missing Telegram credentials. Skipping alert.");
    }

    return NextResponse.json({ success: true, dbError });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
