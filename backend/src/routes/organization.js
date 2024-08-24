const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  const { userID } = req.query;

  db.query(
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

// Route to save a new organization
router.post("/save-organization", (req, res) => {
  let {
    naziv,
    ulica,
    grad,
    e_mail,
    iban,
    datum_unosa_organizacije,
    status,
    slika,
    userID,
  } = req.body;

  if (!datum_unosa_organizacije || datum_unosa_organizacije === "") {
    datum_unosa_organizacije = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
  }

  const slikaUrl = slika || "https://i.stack.imgur.com/l60Hf.png";

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
      userID,
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

// Route to update an existing organization
router.put("/update-organization/:id", (req, res) => {
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

// Route to update the status of an organization
router.put("/update-organization-status/:id", (req, res) => {
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

// Route to delete an organization
router.delete("/delete-organization/:id", (req, res) => {
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

module.exports = router;
