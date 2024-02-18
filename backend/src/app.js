const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

//organization data
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

  db.query(
    "INSERT INTO organizacija (naziv, ulica,grad, e_mail,iban,datum_unosa_organizacije, status, slika ) VALUES ($1, $2, $3, $4, $5, $6, $7,$8)",
    [naziv, ulica, grad, e_mail, iban, datum_unosa_organizacije, status, slika],
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

//Receivers Routes

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

app.listen(process.env.PORT || 8081);
