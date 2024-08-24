// routes/pdfRoutes.js

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const db = require("../db"); // Adjust the path as needed

router.post("/send-pdf", async (req, res) => {
  console.log("Received request to send PDF");

  const { email, htmlContent, userID } = req.body;
  console.log("Email:", email);
  console.log("HTML Content:", htmlContent);
  console.log("UserID:", userID);

  try {
    // Retrieve postavke data from the database
    const postavkeQuery = `
      SELECT * FROM postavke WHERE id_korisnik = $1;
    `;

    const result = await db.query(postavkeQuery, [userID]);
    const postavkeData = result.rows[0];

    if (!postavkeData) {
      throw new Error(
        "No data found in the 'postavke' table for the logged-in user"
      );
    }

    const {
      subject,
      message,
      gmail_key: gmailKey,
      e_mail: eMail,
      filename,
    } = postavkeData;

    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: eMail,
        pass: gmailKey,
      },
    });

    // Create PDF from HTML content
    pdf.create(htmlContent).toBuffer(async (err, pdfBuffer) => {
      if (err) {
        console.error("Error generating PDF:", err);
        return res.status(500).send("Error generating PDF.");
      }

      // Setup email options
      const mailOptions = {
        from: eMail,
        to: email,
        subject: subject,
        text: message,
        attachments: [
          {
            filename: `${filename}.pdf`,
            content: pdfBuffer,
          },
        ],
      };

      console.log("Sending email...");
      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
        res.status(200).send("Email sent successfully.");
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        res.status(500).send("Error sending email.");
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
