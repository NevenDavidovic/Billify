// routes/receivers.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Route to save a single receiver
router.post("/save-receiver", (req, res) => {
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

  db.query(
    "INSERT INTO primatelji_uplatnice (ime_prezime, ulica, grad, e_mail, iznos, datum_unosa_primatelja, opis_placanja, model_placanja, poziv_na_primatelja, id_korisnik) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
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

// Route to delete all receivers
router.delete("/delete-all-receivers", (req, res) => {
  const loggedInUserId = req.body.userID;

  db.query(
    "DELETE FROM primatelji_uplatnice WHERE id_korisnik = $1",
    [loggedInUserId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "All receivers deleted successfully!" });
    }
  );
});

// Route to save multiple receivers
router.post("/save-receivers", (req, res) => {
  const receiverData = req.body;
  const loggedInUserIdCopy = req.body[0].userID;

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

// Route to delete a receiver by ID
router.delete("/delete-receiver/:id", (req, res) => {
  const receiverId = req.params.id;

  db.query(
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

// Route to retrieve receivers by user ID
router.get("/receiver", (req, res) => {
  const userID = req.query.userID;

  db.query(
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

router.put("/update-receiver/:id", (req, res) => {
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

module.exports = router;
