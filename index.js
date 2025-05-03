require("dotenv").config(); // Load from .env
const sgMail = require("@sendgrid/mail");
const express = require("express");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.json());

const sendEmail = async (req, res) => {
  const { to, subject, htmlContent } = req.body;

  const msg = {
    to,
    from: "luckykrkashyap@gmail.com", // ✅ must be verified
    subject,
    html: htmlContent,
  };

  try {
    const a = await sgMail.send(msg);
    console.log(a);

    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    res.status(500).send("Error sending email");
  }
};

app.post("/sendEmail", sendEmail);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
