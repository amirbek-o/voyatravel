import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query("SELECT id, name as full_name, phone, destination, hotel as hotel_name, price, flight_class, flight_type, status, created_at FROM bookings ORDER BY created_at DESC");
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await query("UPDATE bookings SET status = $1 WHERE id = $2", [status, id]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
