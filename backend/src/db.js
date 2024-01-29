// postgree configuration for connection to the databse

const { Pool } = require("pg");

// PostgreSQL configuration for connection to the database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "bilify",
  password: "root",
  port: "5433", // Default port for PostgreSQL is usually 5432
});
pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Error connecting to the PostgreSQL database:", err.stack);
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
