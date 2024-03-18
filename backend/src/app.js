// console.log("hello");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

//Handling registration and login
const bcrypt = require("bcrypt");

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const result = await db.query("SELECT * FROM korisnik WHERE e_mail = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      // If the email is not found, return an error
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the hashed password from the database with the provided password
    const match = await bcrypt.compare(password, result.rows[0].password);

    if (!match) {
      // If the passwords don't match, return an error
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If everything is okay, return a success message
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Use parameterized query to avoid SQL injection
    const queryString = `
      INSERT INTO korisnik (e_mail, password)
      VALUES ($1, $2)
      RETURNING *;
    `;

    // Execute the query with parameters
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

// Endpoint to save receiver data
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
  console.log("request body", req.body); // Log the request body
  // Perform database query to insert the form data into the table
  db.query(
    "INSERT INTO primatelji_uplatnice (ime_prezime, ulica, grad, e_mail, iznos,datum_unosa_primatelja,opis_placanja,model_placanja,poziv_na_primatelja) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
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

//DELETE ALL

app.delete("/delete-all-receivers", (req, res) => {
  // Perform a query to delete all rows from the table
  db.query("DELETE FROM primatelji_uplatnice", (err, result) => {
    if (err) {
      console.log("Error deleting receivers data:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("All receivers data deleted successfully");
    res
      .status(200)
      .json({ message: "All receivers data deleted successfully" });
  });
});

//XML/Excell data manipulation

app.post("/save-receivers", (req, res) => {
  const receiverData = req.body;

  // Create an array to store the promises of each insert operation
  const insertPromises = receiverData.map((receiver) => {
    return new Promise((resolve, reject) => {
      // Perform individual insert query for each record
      db.query(
        `
        INSERT INTO primatelji_uplatnice (
          ime_prezime, ulica, grad, e_mail, iznos,
          datum_unosa_primatelja, opis_placanja, model_placanja, poziv_na_primatelja
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `,
        [
          receiver.platiteljNaziv,
          receiver.platiteljAdresa,
          receiver.platiteljMjesto,
          null, // eMail (You mentioned it should be null in your example)
          receiver.iznos,
          new Date(), // datumUnosaPrimatelja
          receiver.opisPlacanja,
          null, // model_placanja (You mentioned it should be null in your example)
          receiver.pozivNaBrojPrimatelja,
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

  // Wait for all promises to resolve (all insert operations to complete)
  Promise.all(insertPromises)
    .then(() => {
      res.status(200).json({ message: "Receivers data saved successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// SAVING ORGANIZATION DATA TO TABLE
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
  } = req.body; // Assuming these are the fields from your form

  const slikaUrl = slika ? slika : "https://i.stack.imgur.com/l60Hf.png";
  // Perform database query to insert the form data
  db.query(
    "INSERT INTO organizacija (naziv, ulica,grad, e_mail,iban,datum_unosa_organizacije, status, slika ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)",
    [
      naziv,
      ulica,
      grad,
      e_mail,
      iban,
      datum_unosa_organizacije,
      status,
      slikaUrl,
    ],
    (err, result) => {
      if (err) {
        console.log("Error saving data:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Data saved successfully");
      res.status(200).json({ message: "Data saved successfully" });
    }
  );
});

//update receiver

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

  // Perform database query to update the receiver data
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
        // Send a more informative error response to the client
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("Receiver data updated successfully");
      res.status(200).json({ message: "Receiver data updated successfully" });
    }
  );
});

// Update organization data in the table
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

  // Perform database query to update the organization data
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

// Update organization status endpoint
app.put("/update-organization-status/:id", (req, res) => {
  const organizationId = req.params.id;

  // Set the clicked organization as active (status 1)
  db.query(
    "UPDATE organizacija SET status = 1 WHERE id = $1",
    [organizationId],
    (err, result) => {
      if (err) {
        console.log("Error updating organization status:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Organization status updated successfully");

      // Set other organizations as inactive (status 0)
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

// deleting organization item

// Define a DELETE endpoint to remove an organization by its ID
app.delete("/delete-organization/:id", (req, res) => {
  const organizationId = req.params.id;

  // Perform database query to delete the organization by ID
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

//Retrieve Selected User

// Express.js backend route
app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;

  // Perform a database query to fetch user data based on userId
  // Example: Assuming you have a "users" table
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

// Endpoint to retrieve data from the "organizacija" table

app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;

  // Perform a database query to fetch user data based on userId
  // Example: Assuming you have a "users" table
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
  db.query("SELECT * FROM organizacija", [], (err, result) => {
    if (err) {
      console.log("ERROR");
      return res.status(500).json({ error: err.message });
    }
    console.log("Succesful Conection to organizacija");
    res.json({ data: result.rows });
  });
});

//Endpoint where we retrieve data from "primatelji_uptanice" table
app.get("/receiver", (req, res) => {
  db.query("SELECT * FROM primatelji_uplatnice", [], (err, result) => {
    if (err) {
      console.log("ERROR");
      return res.status(500).json({
        error: err.message,
      });
    }
    console.log("succesful connection table -primatelji");
    return res.json({ data: result.rows });
  });
});

//delete a receiver

app.delete("/delete-receiver/:id", (req, res) => {
  const receiverId = req.params.id;

  // Perform a database query to delete the receiver by ID
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

//Endpoint for statistics

app.get("/statistics", async (req, res) => {
  try {
    // Example: querying multiple tables asynchronously
    const cityNumber = await performQuery(
      "SELECT grad,COUNT(*) FROM primatelji_uplatnice GROUP BY grad"
    );
    const largestPayers = await performQuery(
      "SELECT * FROM primatelji_uplatnice ORDER BY iznos DESC LIMIT 3"
    );

    const numberOfPayers = await performQuery(
      "SELECT COUNT(*) FROM primatelji_uplatnice"
    );

    // Sending the aggregated results as a JSON response
    console.log("Succesful Conection to stats");
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

app.post("/send-email", async (req, res) => {
  const { fileId } = req.body;

  // Read the PDF file content
  const pdfAttachment = fs.readFileSync(`path/to/${fileId}.pdf`);

  const mailOptions = {
    from: "your-email@example.com", // Replace with your sender email address
    to: "recipient@example.com", // Replace with the recipient email address
    subject: "Subject of the Email",
    text: "Body of the Email",
    attachments: [
      {
        filename: "exported-document.pdf",
        content: pdfAttachment,
        encoding: "base64",
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

function performQuery(sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, [], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result.rows);
    });
  });
}

app.listen(process.env.PORT || 8081);
