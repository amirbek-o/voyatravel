const fs = require('fs');
const { Pool } = require('pg');

// Read DATABASE_URL from .env.local
const env = fs.readFileSync('.env.local', 'utf-8');
const dbUrlMatch = env.match(/DATABASE_URL="?([^"\n]+)"?/);
const DATABASE_URL = dbUrlMatch ? dbUrlMatch[1].trim() : '';

if (!DATABASE_URL) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const uzData = JSON.parse(fs.readFileSync('./src/data/tours-uz.json', 'utf-8'));
const ruData = JSON.parse(fs.readFileSync('./src/data/tours-ru.json', 'utf-8'));
const enData = JSON.parse(fs.readFileSync('./src/data/tours-en.json', 'utf-8'));

async function seed() {
  try {
    // 1. Recreate table (this handles dropping if it exists as defined in our schema change)
    // Actually, we can just run the DROP and CREATE TABLE here directly just in case Next.js hasn't done it yet.
    await pool.query(`
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
    `);

    console.log("Table 'tours' recreated. Seeding 37 records...");

    for (let i = 0; i < uzData.length; i++) {
      const u = uzData[i];
      const r = ruData[i];
      const e = enData[i];

      const hotelName = u.hotel.name;
      const priceSum = u.package.price; // Already in UZS
      const nights = u.duration.nights;
      const destUz = `${u.destination.town}, ${u.destination.name}`;
      const destRu = `${r.destination.town}, ${r.destination.name}`;
      const destEn = `${e.destination.town}, ${e.destination.name}`;
      const imageUrl = u.imageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop";
      const cardStatus = 'Active';
      const roomCategories = u.included.roomType || "Standard Room";
      const flightParams = (u.included.flightIn && u.included.flightOut) ? "Round Trip" : "One Way";

      await pool.query(`
        INSERT INTO tours (
          hotel_name, price_sum, nights, destination_uz, destination_ru, destination_en,
          image_url, card_status, room_categories, flight_parameters
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [hotelName, priceSum, nights, destUz, destRu, destEn, imageUrl, cardStatus, roomCategories, flightParams]);
    }

    console.log("Successfully seeded 37 packages into 'tours'.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    pool.end();
  }
}

seed();
