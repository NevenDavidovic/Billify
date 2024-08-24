require("dotenv").config(); // This should be the very first line

const { Pool } = require("pg");

// Debugging environment variables
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Event listener for successful connection
pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

// Event listener for connection errors
pool.on("error", (err) => {
  console.error("Error connecting to the PostgreSQL database:", err.stack);
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
