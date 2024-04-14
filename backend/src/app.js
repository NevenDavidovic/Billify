const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
});

const bcrypt = require("bcrypt");
let loggedInUserId = null;

app.post("/logout", (req, res) => {
  try {
    loggedInUserId = null;

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query("SELECT * FROM korisnik WHERE e_mail = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, result.rows[0].password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    loggedInUserId = result.rows[0].id;
    console.log(loggedInUserId);

    res.status(200).json({
      message: "User logged in successfully",
      email,
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db.query(
      "SELECT * FROM korisnik WHERE e_mail = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const queryString = `
      INSERT INTO korisnik (e_mail, password)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const result = await db.query(queryString, [email, hashedPassword]);

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  } = req.body;
  console.log("request body", req.body);

  db.query(
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
      loggedInUserId,
    ],
    (err, result) => {
      if (err) {
        console.log("Error saving receiver data:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Receiver data saved successfully");
      res.status(200).json({ message: "Receiver data saved successfully" });
    }
  );
});

app.delete("/delete-all-receivers", (req, res) => {
  const loggedInUserIdCopy = loggedInUserId;

  db.query(
    "DELETE FROM primatelji_uplatnice WHERE id_korisnik = $1",
    [loggedInUserIdCopy], // Use loggedInUserId directly in the query
    (err, result) => {
      if (err) {
        console.log("Error deleting receivers data:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log(
        "All receivers data deleted successfully for the logged-in user"
      );
      res.status(200).json({
        message:
          "All receivers data deleted successfully for the logged-in user",
      });
    }
  );
});

app.post("/save-receivers", (req, res) => {
  const receiverData = req.body;
  const loggedInUserIdCopy = loggedInUserId;

  const insertPromises = receiverData.map((receiver) => {
    return new Promise((resolve, reject) => {
      db.query(
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
          null,
          receiver.iznos,
          new Date(),
          receiver.opisPlacanja,
          null,
          receiver.pozivNaBrojPrimatelja,
          loggedInUserIdCopy,
        ],
        (err, result) => {
          if (err) {
            console.log("Error saving receiver data:", err);
            reject(err);
          } else {
            console.log("Receiver data saved successfully");
            resolve(result);
          }
        }
      );
    });
  });

  Promise.all(insertPromises)
    .then((results) => {
      console.log("All receiver data saved successfully");
      res.status(200).json({ message: "All receiver data saved successfully" });
    })
    .catch((error) => {
      console.log("Error saving receiver data:", error);
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
  } = req.body;

  const slikaUrl = slika ? slika : "https://i.stack.imgur.com/l60Hf.png";
  const loggedInUserIdCopy = loggedInUserId;

  db.query(
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
      loggedInUserIdCopy,
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

  db.query(
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

  db.query(
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

  db.query(
    "UPDATE organizacija SET status = 1 WHERE id = $1",
    [organizationId],
    (err, result) => {
      if (err) {
        console.log("Error updating organization status:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Organization status updated successfully");

      db.query(
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

  db.query(
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

  db.query("SELECT * FROM users WHERE id = $1", [userId], (err, result) => {
    if (err) {
      console.log("Error fetching user data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = result.rows[0];
    res.status(200).json(userData);
  });
});

app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query("SELECT * FROM users WHERE id = $1", [userId], (err, result) => {
    if (err) {
      console.log("Error fetching user data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = result.rows[0];
    res.status(200).json(userData);
  });
});

//HOME

app.get("/", (req, res) => {
  const loggedInUserIdCopy = loggedInUserId;

  db.query(
    "SELECT * FROM organizacija WHERE id_korisnik = $1",
    [loggedInUserIdCopy],
    (err, result) => {
      if (err) {
        console.log("ERROR");
        return res.status(500).json({ error: err.message });
      }
      console.log("Successful Connection to organizacija");
      res.json({ data: result.rows });
    }
  );
});

app.get("/receiver", (req, res) => {
  const loggedInUserIdCopy = loggedInUserId;

  db.query(
    "SELECT * FROM primatelji_uplatnice WHERE id_korisnik = $1",
    [loggedInUserIdCopy],
    (err, result) => {
      if (err) {
        console.log("ERROR");
        return res.status(500).json({
          error: err.message,
        });
      }
      console.log("Successful connection to the primatelji table");
      return res.json({ data: result.rows });
    }
  );
});

app.delete("/delete-receiver/:id", (req, res) => {
  const receiverId = req.params.id;

  db.query(
    "DELETE FROM primatelji_uplatnice WHERE id = $1",
    [receiverId],
    (err, result) => {
      if (err) {
        console.log("Error deleting receiver:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Receiver deleted successfully");
      res.status(200).json({ message: "Receiver deleted successfully" });
    }
  );
});

app.get("/statistics", async (req, res) => {
  try {
    const loggedInUserIdCopy = loggedInUserId;
    console.log("loggedInUserId:", loggedInUserId);

    const cityNumberQuery =
      "SELECT grad, COUNT(*) FROM primatelji_uplatnice WHERE id_korisnik = $1 GROUP BY grad";
    const largestPayersQuery =
      "SELECT * FROM primatelji_uplatnice WHERE id_korisnik = $1 ORDER BY iznos DESC LIMIT 3";
    const numberOfPayersQuery =
      "SELECT COUNT(*) FROM primatelji_uplatnice WHERE id_korisnik = $1";

    const cityNumberResult = await db.query(cityNumberQuery, [
      loggedInUserIdCopy,
    ]);
    console.log("cityNumberResult:", cityNumberResult.rows);

    const largestPayersResult = await db.query(largestPayersQuery, [
      loggedInUserIdCopy,
    ]);
    console.log("largestPayersResult:", largestPayersResult.rows);

    const numberOfPayersResult = await db.query(numberOfPayersQuery, [
      loggedInUserIdCopy,
    ]);
    console.log("numberOfPayersResult:", numberOfPayersResult.rows);

    const cityNumber = cityNumberResult.rows;
    const largestPayers = largestPayersResult.rows;
    const numberOfPayers = numberOfPayersResult.rows;

    // Sending the aggregated results as a JSON response
    console.log("Successful Connection to stats");
    return res.json({
      cityNum: cityNumber,
      largestPay: largestPayers,
      numPayers: numberOfPayers,
    });
  } catch (err) {
    console.error("Error occurred while fetching data:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Route to generate PDF and send via email
// Backend code
app.post("/send-pdf", async (req, res) => {
  console.log("Received request to send PDF");

  const { email, htmlContent } = req.body;
  console.log("Email:", email);
  console.log("HTML Content:", htmlContent);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nenoronnie@gmail.com",
      pass: "",
    },
  });

  const browser = await puppeteer.launch();
  console.log("Browser launched");

  const page = await browser.newPage();
  console.log("New page created");

  await page.setContent(htmlContent); // Set the received HTML content
  console.log("HTML content set on page");

  const pdfBuffer = await page.pdf();
  console.log("PDF generated");

  // Sending email with PDF attachment
  const mailOptions = {
    from: "nenoronnie@gmail.com",
    to: email,
    subject: "PDF Attachment",
    text: "Please find attached PDF.",
    attachments: [
      {
        filename: "uplatnica.pdf",
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
});

app.listen(process.env.PORT || 8081);
