require("dotenv").config();
const express = require("express");
const { sendEmail } = require("./services/emailService");
const { renderTemplate } = require("./services/templateService");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const templatesMap = {
  welcome: { subject: "Welcome to Our Service" },
  changePassword: { subject: "Your Password Has Been Changed" },
  thanks: { subject: "Thank You!" },
};

app.post("/sendEmail", async (req, res) => {
  /*
  Expected JSON body:
  {
    "to": "user@example.com",
    "template": "welcome",
    "data": {
      "name": "Lucky",
      "date": "2025-05-18"
    }
  }
  */
  const { to, template, data } = req.body;

  if (!to || !template) {
    return res.status(400).json({ error: "Missing 'to' or 'template' fields" });
  }

  if (!templatesMap[template]) {
    return res
      .status(400)
      .json({ error: `Template '${template}' not supported` });
  }

  try {
    const htmlContent = renderTemplate(template, data);
    const subject = templatesMap[template].subject;

    await sendEmail({ to, subject, html: htmlContent });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
