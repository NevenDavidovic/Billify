// routes/postavke.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET route to fetch postavke data
router.get("/postavke", async (req, res) => {
  try {
    const { userID } = req.query;
    console.log("Received userID:", userID);

    const postavkeQuery = `
      SELECT * FROM postavke WHERE id_korisnik = $1;
    `;

    const result = await db.query(postavkeQuery, [userID]);

    res.json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching data from postavke:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT route to update postavke data
router.put("/postavke", async (req, res) => {
  try {
    const {
      userID,
      subject,
      message,
      e_mail_template,
      gmail_key,
      e_mail,
      filename,
    } = req.body;

    console.log("Received update request with data:", req.body);

    const updateQuery = `
      UPDATE postavke
      SET subject = $1, message = $2, e_mail_template = $3, gmail_key = $4, e_mail = $5, filename = $6
      WHERE id_korisnik = $7;
    `;

    await db.query(updateQuery, [
      subject,
      message,
      e_mail_template,
      gmail_key,
      e_mail,
      filename,
      userID,
    ]);

    res.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating postavke data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
