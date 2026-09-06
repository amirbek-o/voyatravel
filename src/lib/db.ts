import { Pool } from "pg";

// Create a connection pool using the DATABASE_URL environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

// Ensure the bookings table exists
export async function initDb() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      hotel_name VARCHAR(255),
      price NUMERIC,
      flight_class VARCHAR(50) NOT NULL,
      flight_type VARCHAR(50) NOT NULL,
      status VARCHAR(50) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const createToursTableQuery = `
    DROP TABLE IF EXISTS tours;
    CREATE TABLE tours (
      id SERIAL PRIMARY KEY,
      hotel_name VARCHAR(255) NOT NULL,
      price_sum NUMERIC NOT NULL,
      nights INT NOT NULL,
      destination_uz VARCHAR(255) NOT NULL,
      destination_ru VARCHAR(255) NOT NULL,
      destination_en VARCHAR(255) NOT NULL,
      image_url TEXT NOT NULL,
      card_status VARCHAR(50) DEFAULT 'Active',
      room_categories VARCHAR(255) NOT NULL,
      flight_parameters VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const alterToursTableQuery = ``;
  try {
    await query(createTableQuery);
    await query(createToursTableQuery);
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

// Call initDb on startup
if (process.env.DATABASE_URL) {
  initDb();
}
