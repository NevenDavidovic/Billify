const express = require("express");
const router = express.Router();
const db = require("../db");

// Route to get statistics
router.get("/statistics", async (req, res) => {
  try {
    const loggedInUserId = req.query.userID; // Retrieve userID from query parameters
    console.log("loggedInUserId:", loggedInUserId);

    const cityNumberQuery =
      "SELECT grad, COUNT(*) FROM primatelji_uplatnice WHERE id_korisnik = $1 GROUP BY grad";
    const largestPayersQuery =
      "SELECT * FROM primatelji_uplatnice WHERE id_korisnik = $1 ORDER BY iznos DESC LIMIT 3";
    const numberOfPayersQuery =
      "SELECT COUNT(*) FROM primatelji_uplatnice WHERE id_korisnik = $1";

    const cityNumberResult = await db.query(cityNumberQuery, [loggedInUserId]);
    const largestPayersResult = await db.query(largestPayersQuery, [
      loggedInUserId,
    ]);
    const numberOfPayersResult = await db.query(numberOfPayersQuery, [
      loggedInUserId,
    ]);
    console.log("numberOfPayersResult:", numberOfPayersResult.rows);

    const cityNumber = cityNumberResult.rows;
    const largestPayers = largestPayersResult.rows;
    const numberOfPayers = numberOfPayersResult.rows[0]; // Adjusted to extract the count

    return res.json({
      cityNum: cityNumber,
      largestPay: largestPayers,
      numPayers: numberOfPayers.count, // Adjusted to extract the count
    });
  } catch (err) {
    console.error("Error fetching statistics:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
