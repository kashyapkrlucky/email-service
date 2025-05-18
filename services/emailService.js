const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const FROM_EMAIL = process.env.FROM_EMAIL;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, html }) {
  if (!to || !subject || !html) {
    throw new Error("Missing required fields: to, subject, or html");
  }

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    html,
  };

  return sgMail.send(msg);
}

module.exports = { sendEmail };
