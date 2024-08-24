const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  storage: multer.memoryStorage(),
});
const pdf = require("html-pdf");
// require routes
const authRoutes = require("./routes/auth");
const receiverRoutes = require("./routes/receivers");
const organizationRoutes = require("./routes/organization");
const statisticsRoutes = require("./routes/statistics");
const postavkeRoutes = require("./routes/postavke");
const emailUtils = require("./routes/emailUtility");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

const bcrypt = require("bcrypt");
let loggedInUserId = null;

// Use the auth routes
app.use("/auth", authRoutes);

// Use the receiver routes
app.use("/receivers", receiverRoutes);

// Use the organization routes
app.use("/organizations", organizationRoutes);

// Use the statistics routes
app.use("/statistics", statisticsRoutes);

// Use the postavke routes
app.use("/postavke", postavkeRoutes);

// Use the routes
app.use("/emailUtility", emailUtils);

app.get("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query("SELECT * FROM users WHERE id = $1", [userId], (err, result) => {
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

app.listen(process.env.PORT || 8081);
