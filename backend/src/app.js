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

app.listen(process.env.PORT || 8081);
