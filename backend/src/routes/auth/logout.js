const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
  try {
    loggedInUserId = null;

    res.status(200).json({ message: "Korisnik se uspješno odjavio" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
