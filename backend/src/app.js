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

//HOME

// app.post("/send-pdf", async (req, res) => {
//   console.log("Received request to send PDF");

//   const { email, htmlContent, userID } = req.body;
//   console.log("Email:", email);
//   console.log("HTML Content:", htmlContent);
//   console.log("UserID:", userID);

//   try {
//     const postavkeQuery = `
//       SELECT * FROM postavke WHERE id_korisnik = $1;
//     `;

//     const result = await db.query(postavkeQuery, [userID]);
//     const postavkeData = result.rows[0];

//     if (!postavkeData) {
//       throw new Error(
//         "No data found in the 'postavke' table for the logged-in user"
//       );
//     }

//     const {
//       subject,
//       message,
//       gmail_key: gmailKey,
//       e_mail: eMail,
//       filename,
//     } = postavkeData;

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: eMail,
//         pass: gmailKey,
//       },
//     });

//     pdf.create(htmlContent).toBuffer(async (err, pdfBuffer) => {
//       if (err) {
//         console.error("Error generating PDF:", err);
//         return res.status(500).send("Error generating PDF.");
//       }

//       const mailOptions = {
//         from: eMail,
//         to: email,
//         subject: subject,
//         text: message,
//         attachments: [
//           {
//             filename: `${filename}.pdf`,
//             content: pdfBuffer,
//           },
//         ],
//       };

//       console.log("Sending email...");
//       try {
//         await transporter.sendMail(mailOptions);
//         console.log("Email sent");
//         res.status(200).send("Email sent successfully.");
//       } catch (emailError) {
//         console.error("Error sending email:", emailError);
//         res.status(500).send("Error sending email.");
//       }
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error.");
//   }
// });

app.listen(process.env.PORT || 8081);
