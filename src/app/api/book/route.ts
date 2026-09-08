import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, commentary, destination, hotelName, price, flightClass, flightType } = body;

    // Validate inputs
    if (!fullName || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Database
    if (process.env.DATABASE_URL) {
      // Updated schema to match exact Supabase columns: name, hotel, etc.
      await query(
        "INSERT INTO bookings (name, phone, destination, hotel, price, flight_class, flight_type, status, commentary) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [fullName, phone, destination || "Unknown Destination", hotelName || "Unknown", String(price || 0), flightClass, flightType, "Pending", commentary || ""]
      );
    } else {
      console.warn("No DATABASE_URL provided. Skipping DB insert.");
    }

    // Send Telegram Alert
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
📝 *Commentary:* ${commentary || "No comments"}
      `;

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
    } else {
      console.warn("Missing Telegram credentials. Skipping alert.");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}
