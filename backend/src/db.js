const { Pool } = require("pg"); // Import Pool class from pg library

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "bilify",
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT || 5433,
});

function handleDbError(err) {
  console.error("Error connecting to the PostgreSQL database:", err.stack);
  process.exit(1); // Exit the application on database connection error (optional: handle gracefully)
}

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

pool.on("error", handleDbError);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
