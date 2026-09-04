const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://postgres:Amirbek..777..@db.wotnvbfxvkoolmepxajn.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const client = await pool.connect();
    console.log("Connected successfully");
    const res = await client.query("SELECT * FROM bookings");
    console.log("Bookings:", res.rows);
    
    // Check table definition
    const tableInfo = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'bookings'
    `);
    console.log("Table columns:", tableInfo.rows);
    
    client.release();
    pool.end();
  } catch (e) {
    console.error("Database Save Error:", e);
  }
}

test();
