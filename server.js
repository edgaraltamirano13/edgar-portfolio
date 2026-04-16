const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = SMTP_PORT === 465;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  requireTLS: !SMTP_SECURE,
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
  family: 4,
  tls: {
    servername: SMTP_HOST,
    minVersion: 'TLSv1.2',
  },
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!EMAIL_USER || !EMAIL_PASS) {
    return res.status(500).json({ error: 'Email service is not configured. Check EMAIL_USER and EMAIL_PASS.' });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    replyTo: email,
    subject: `New message from ${name} — Portfolio`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #fff; border-radius: 12px;">
        <h2 style="color: #CC0000; font-size: 24px; margin-bottom: 24px;">New Portfolio Contact</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 80px;">Name</td><td style="padding: 8px 0; color: #fff; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #CC0000;">${email}</a></td></tr>
        </table>
        <div style="margin-top: 24px; padding: 20px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid #CC0000;">
          <p style="color: #ccc; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
        </div>
        <p style="color: #333; font-size: 12px; margin-top: 24px;">Sent from edgaraltamiranoportfolio.com</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email. Verify Gmail App Password in Railway variables.' });
  }
});

// Serve all HTML pages
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
