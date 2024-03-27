// emailConfig.js

const nodemailer = require("nodemailer");

try {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nenoronnie@gmail.com",
      pass: "enter_your_google_gmail_key",
    },
  });
  console.log("Transporter created successfully");
  console.log("Transporter:", transporter);
} catch (error) {
  console.error("Error creating transporter:", error);
}
