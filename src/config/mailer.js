const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth:
    process.env.SMTP_USER && process.env.SMTP_PASS
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
});

function buildHtmlEmail(quote) {
  const data = quote.normalize();
  return `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
      <h2 style="color: #2e5719; margin-bottom: 12px;">New Quote Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Property address:</strong> ${data.address}</p>
      <p><strong>Service needed:</strong> ${data.service}</p>
      <div style="margin-top: 16px; padding: 14px; border-left: 4px solid #3d7122; background: #f7faf4;">
        <strong>Project details</strong>
        <p style="margin: 8px 0 0; white-space: pre-wrap;">${data.details}</p>
      </div>
    </div>
  `;
}

async function sendQuoteEmail(quote) {
  const normalized = quote.normalize();
  const recipient = process.env.QUOTE_RECIPIENT || 'laurin171125@gmail.com';

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER || 'quotes@gardenlandscapingpros.com',
    to: recipient,
    subject: `New quote request from ${normalized.name}`,
    text: quote.toEmailContent(),
    html: buildHtmlEmail(quote),
  };

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('SMTP credentials are not configured. Email preview:');
    console.log(mailOptions);
    return { skipped: true };
  }

  await transporter.sendMail(mailOptions);
  return { skipped: false };
}

module.exports = { sendQuoteEmail };
