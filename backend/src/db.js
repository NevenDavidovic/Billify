const { Pool } = require("pg"); // Import Pool class from pg library

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "bilify",
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || 5432,
});

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Error connecting to the PostgreSQL database:", err.stack);
  process.exit(1); // Exit the application on database connection error (optional: handle gracefully)
});

module.exports = {
  query: async (text, params) => {
    console.log(`Executing query: ${text} with params: ${params}`);
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (err) {
      console.error("Query error:", err.stack);
      throw err;
    }
  },
};
