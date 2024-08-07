const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
//const pool = require("./pool");
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  storage: multer.memoryStorage(),
});

const { Pool } = require("pg"); // Import Pool class from pg library

console.log({
  user: process.env.pool_USER,
  host: process.env.pool_HOST,
  database: process.env.pool_NAME,
  password: process.env.pool_PASSWORD,
  port: process.env.pool_PORT,
});

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

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 8081;

const bcrypt = require("bcrypt");
let loggedInUserId = null;

app.get("/test", (req, res) => {
  res.status(200).send("Backend is working");
});

app.post("/logout", (req, res) => {
  console.log("Request received on /logout route!");
  try {
    res.status(200).json({ message: "Korisnik se uspješno odjavio" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      "SELECT * FROM korisnik WHERE e_mail = $1",
      [email]
    );

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

    loggedInUserId = result.rows[0].id;
    console.log(loggedInUserId);

    res.status(200).json({
      message: "Korisnik se uspješno prijavio",
      email,
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Unutarnji server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await pool.query(
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
    const registerResult = await pool.query(registerQuery, [
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

    await pool.query(defaultSettingsQuery, [
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
    console.error("Register error:", error);
    res.status(500).json({ error: "Unutrašnji server error" });
  }
});

app.post("/save-receiver", (req, res) => {
  const {
    imePrezime,
    adresaStanovanja,
    gradPostanskiBroj,
    eMail,
    iznos,
    datumUnosaPrimatelja,
    opisPlacanja,
    model_placanja,
    poziv_na_primatelja,
    userID,
  } = req.body;
  console.log("request body", req.body);
  console.log(typeof userID);

  pool.query(
    "INSERT INTO primatelji_uplatnice (ime_prezime, ulica, grad, e_mail, iznos,datum_unosa_primatelja,opis_placanja,model_placanja,poziv_na_primatelja,id_korisnik) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)",
    [
      imePrezime,
      adresaStanovanja,
      gradPostanskiBroj,
      eMail,
      iznos,
      datumUnosaPrimatelja,
      opisPlacanja,
      model_placanja,
      poziv_na_primatelja,
      userID,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json({ message: "Receiver data saved successfully" });
    }
  );
});

app.delete("/delete-all-receivers", (req, res) => {
  const loggedInUserId = req.body.userID; // Assuming userID is sent in the request body

  pool.query(
    "DELETE FROM primatelji_uplatnice WHERE id_korisnik = $1",
    [loggedInUserId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json({
        message: "Svi primatelji su uspješno obrisani!",
      });
    }
  );
});

app.post("/save-receivers", (req, res) => {
  const receiverData = req.body;

  const loggedInUserIdCopy = req.body[0].userID;

  const insertPromises = receiverData.map((receiver) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `
        INSERT INTO primatelji_uplatnice (
          ime_prezime, ulica, grad, e_mail, iznos,
          datum_unosa_primatelja, opis_placanja, model_placanja, poziv_na_primatelja, id_korisnik
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `,
        [
          receiver.platiteljNaziv,
          receiver.platiteljAdresa,
          receiver.platiteljMjesto,
          receiver.emailAdresa,
          receiver.iznos,
          new Date(),
          receiver.opisPlacanja,
          null,
          receiver.pozivNaBrojPrimatelja,
          loggedInUserIdCopy,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  });

  Promise.all(insertPromises)
    .then((results) => {
      res.status(200).json({ message: "All receiver data saved successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error saving receiver data" });
    });
});

app.post("/save-organization", (req, res) => {
  const {
    naziv,
    ulica,
    grad,
    e_mail,
    iban,
    datum_unosa_organizacije,
    status,
    slika,
    userID, // Extract userID from the request body
  } = req.body;

  if (datum_unosa_organizacije === "") {
    datum_unosa_organizacije = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
  }

  const slikaUrl = slika ? slika : "https://i.stack.imgur.com/l60Hf.png";

  pool.query(
    "INSERT INTO organizacija (naziv, ulica, grad, e_mail, iban, datum_unosa_organizacije, status, slika, id_korisnik) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    [
      naziv,
      ulica,
      grad,
      e_mail,
      iban,
      datum_unosa_organizacije,
      status,
      slikaUrl,
      userID, // Use userID from the request body
    ],
    (err, result) => {
      if (err) {
        console.log("Error saving organization data:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Organization data saved successfully");
      res.status(200).json({ message: "Organization data saved successfully" });
    }
  );
});

app.put("/update-receiver/:id", (req, res) => {
  const receiverId = req.params.id;
  const {
    ime_prezime,
    ulica,
    grad,
    e_mail,
    iznos,
    datum_unosa_primatelja,
    opis_placanja,
    model_placanja,
    poziv_na_primatelja,
  } = req.body;

  pool.query(
    "UPDATE primatelji_uplatnice SET ime_prezime=$1, ulica=$2, grad=$3, e_mail=$4, iznos=$5, datum_unosa_primatelja=$6, opis_placanja=$7, model_placanja=$8, poziv_na_primatelja=$9 WHERE id=$10",
    [
      ime_prezime,
      ulica,
      grad,
      e_mail,
      iznos,
      datum_unosa_primatelja,
      opis_placanja,
      model_placanja,
      poziv_na_primatelja,
      receiverId,
    ],
    (err, result) => {
      if (err) {
        console.log("Error updating receiver data:", err);

        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("Receiver data updated successfully");
      res.status(200).json({ message: "Receiver data updated successfully" });
    }
  );
});

app.put("/update-organization/:id", (req, res) => {
  const organizationId = req.params.id;
  const {
    naziv,
    ulica,
    grad,
    e_mail,
    iban,
    datum_unosa_organizacije,
    status,
    slika,
  } = req.body;

  pool.query(
    "UPDATE organizacija SET naziv=$1, ulica=$2, grad=$3, e_mail=$4, iban=$5, datum_unosa_organizacije=$6, status=$7, slika=$8 WHERE id=$9",
    [
      naziv,
      ulica,
      grad,
      e_mail,
      iban,
      datum_unosa_organizacije,
      status,
      slika,
      organizationId,
    ],
    (err, result) => {
      if (err) {
        console.log("Error updating organization data:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Organization data updated successfully");
      res
        .status(200)
        .json({ message: "Organization data updated successfully" });
    }
  );
});

app.put("/update-organization-status/:id", (req, res) => {
  const organizationId = req.params.id;

  pool.query(
    "UPDATE organizacija SET status = 1 WHERE id = $1",
    [organizationId],
    (err, result) => {
      if (err) {
        console.log("Error updating organization status:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Organization status updated successfully");

      pool.query(
        "UPDATE organizacija SET status = 0 WHERE id != $1",
        [organizationId],
        (err, result) => {
          if (err) {
            console.log("Error updating other organization statuses:", err);
            return res.status(500).json({ error: err.message });
          }
          console.log("Other organization statuses updated successfully");
          res
            .status(200)
            .json({ message: "Organization status updated successfully" });
        }
      );
    }
  );
});

app.delete("/delete-organization/:id", (req, res) => {
  const organizationId = req.params.id;

  pool.query(
    "DELETE FROM organizacija WHERE id = $1",
    [organizationId],
    (err, result) => {
      if (err) {
        console.log("Error deleting organization:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Organization deleted successfully");
      res.status(200).json({ message: "Organization deleted successfully" });
    }
  );
});

app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;

  pool.query("SELECT * FROM users WHERE id = $1", [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Greška na poslužitelju" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Korisnik nije nađen" });
    }

    const userData = result.rows[0];
    res.status(200).json(userData);
  });
});

//HOME

app.get("/", (req, res) => {
  const { userID } = req.query;

  pool.query(
    "SELECT * FROM organizacija WHERE id_korisnik = $1",
    [userID],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ data: result.rows });
    }
  );
});

app.get("/receiver", (req, res) => {
  const userID = req.query.userID; // Get userID from query parameters

  pool.query(
    "SELECT * FROM primatelji_uplatnice WHERE id_korisnik = $1",
    [userID],
    (err, result) => {
      if (err) {
        console.log("ERROR");
        return res.status(500).json({
          error: err.message,
        });
      }

      return res.json({ data: result.rows });
    }
  );
});

app.delete("/delete-receiver/:id", (req, res) => {
  const receiverId = req.params.id;

  pool.query(
    "DELETE FROM primatelji_uplatnice WHERE id = $1",
    [receiverId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json({ message: "Receiver deleted successfully" });
    }
  );
});

app.get("/statistics", async (req, res) => {
  try {
    const loggedInUserId = req.query.userID; // Retrieve userID from query parameters
    console.log("loggedInUserId:", loggedInUserId);

    const cityNumberQuery =
      "SELECT grad, COUNT(*) FROM primatelji_uplatnice WHERE id_korisnik = $1 GROUP BY grad";
    const largestPayersQuery =
      "SELECT * FROM primatelji_uplatnice WHERE id_korisnik = $1 ORDER BY iznos DESC LIMIT 3";
    const numberOfPayersQuery =
      "SELECT COUNT(*) FROM primatelji_uplatnice WHERE id_korisnik = $1";

    const cityNumberResult = await pool.query(cityNumberQuery, [
      loggedInUserId,
    ]);
    const largestPayersResult = await pool.query(largestPayersQuery, [
      loggedInUserId,
    ]);
    const numberOfPayersResult = await pool.query(numberOfPayersQuery, [
      loggedInUserId,
    ]);
    console.log("numberOfPayersResult:", numberOfPayersResult.rows);

    const cityNumber = cityNumberResult.rows;
    const largestPayers = largestPayersResult.rows;
    const numberOfPayers = numberOfPayersResult.rows;

    return res.json({
      cityNum: cityNumber,
      largestPay: largestPayers,
      numPayers: numberOfPayers,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/send-pdf", async (req, res) => {
  console.log("Received request to send PDF");

  const { email, htmlContent, userID } = req.body;
  console.log("Email:", email);
  console.log("HTML Content:", htmlContent);
  console.log("UserID:", userID);

  try {
    const postavkeQuery = `
      SELECT * FROM postavke WHERE id_korisnik = $1;
    `;

    const result = await pool.query(postavkeQuery, [userID]);
    const postavkeData = result.rows[0];

    if (!postavkeData) {
      throw new Error(
        "No data found in the 'postavke' table for the logged-in user"
      );
    }

    const subject = postavkeData.subject;
    const message = postavkeData.message;
    const gmailKey = postavkeData.gmail_key;
    const e_mail = postavkeData.e_mail;
    const filename = postavkeData.filename;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: e_mail,
        pass: gmailKey,
      },
    });

    const browser = await puppeteer.launch();
    console.log("Browser launched");

    const page = await browser.newPage();
    console.log("New page created");

    await page.setContent(htmlContent);
    console.log("HTML content set on page");

    const pdfBuffer = await page.pdf();
    console.log("PDF generated");

    const mailOptions = {
      from: e_mail,
      to: email,
      subject: subject,
      text: message,
      attachments: [
        {
          filename: filename + ".pdf",
          content: pdfBuffer,
        },
      ],
    };

    console.log("Sending email...");
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).send("Error sending email.");
      } else {
        console.log("Email sent: ", info.response);
        res.status(200).send("Email sent successfully.");
      }
    });

    await browser.close();
    console.log("Browser closed");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error.");
  }
});

app.get("/postavke", async (req, res) => {
  try {
    const { userID } = req.query; // Get userID from query parameters
    console.log("Received userID:", userID);

    const postavkeQuery = `
      SELECT * FROM postavke WHERE id_korisnik = $1;
    `;

    const result = await pool.query(postavkeQuery, [userID]);

    res.json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching data from postavke:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//----------------------------------------------------------------------------ONLY THIS
app.put("/postavke", async (req, res) => {
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

    await pool.query(updateQuery, [
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
