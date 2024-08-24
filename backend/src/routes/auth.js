const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db"); // Adjust this path if your db file is located differently

const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query("SELECT * FROM korisnik WHERE e_mail = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Nepravilni korisničko ime i lozinka" });
    }

    const match = await bcrypt.compare(password, result.rows[0].password);

    if (!match) {
      return res
        .status(401)
        .json({ error: "Nepravilni korisničko ime i lozinka" });
    }

    const loggedInUserId = result.rows[0].id;
    console.log(loggedInUserId);

    res.status(200).json({
      message: "Korisnik se uspješno prijavio",
      email,
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error in /login route:", error);
    res.status(500).json({ error: "Unutarnji server error" });
  }
});

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db.query(
      "SELECT * FROM korisnik WHERE e_mail = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Email se već koristi" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registerQuery = `
      INSERT INTO korisnik (e_mail, password)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const registerResult = await db.query(registerQuery, [
      email,
      hashedPassword,
    ]);
    const userId = registerResult.rows[0].id;

    const defaultSettingsQuery = `
      INSERT INTO postavke (subject, message, e_mail_template, gmail_key, id_korisnik, e_mail, filename)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;

    const defaultSubject = "Servis za dostavu uplatnicu Bilify";
    const defaultMessage = "Uplatnica je dostavljena putem servisa bilify";
    const defaultEmailTemplate = 3;
    const defaultGmailKey = "Unesi svoj gmail Key";
    const emailKorisnik = "something@gmail.com";
    const filename = "upatnica";

    await db.query(defaultSettingsQuery, [
      defaultSubject,
      defaultMessage,
      defaultEmailTemplate,
      defaultGmailKey,
      userId,
      emailKorisnik,
      filename,
    ]);

    res.status(201).json({
      message: "Korisnik se uspješno prijavio",
      user: { id: userId, email: email },
    });
  } catch (error) {
    console.error("Error in /register route:", error);
    res.status(500).json({ error: "Unutrašnji server error" });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  console.log("Request received on /logout route!");
  try {
    res.status(200).json({ message: "Korisnik se uspješno odjavio" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
