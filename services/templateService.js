const fs = require("fs");
const path = require("path");

const templatesDir = path.join(__dirname, "templates");

// Simple template engine: replace {{key}} with data[key]
function renderTemplate(templateName, data = {}) {
  const filePath = path.join(templatesDir, templateName + ".html");
  if (!fs.existsSync(filePath)) {
    throw new Error(`Template ${templateName} not found`);
  }
  let template = fs.readFileSync(filePath, "utf-8");

  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    template = template.replace(regex, value);
  });

  return template;
}

module.exports = { renderTemplate };
