# Email Service with SendGrid and Templates

## Features

- Configurable SendGrid API and sender email via environment variables
- HTML email templates with simple placeholder replacements
- API endpoint to send templated emails with dynamic data
- Easy to add new templates

## Setup

1. Copy `.env.example` to `.env` and fill your credentials
2. Run `npm install`
3. Start the server with `node app.js`
4. POST to `/sendEmail` with JSON body:

```json
{
  "to": "recipient@example.com",
  "template": "welcome",
  "data": {
    "name": "Lucky",
    "date": "2025-05-18"
  }
}
```
