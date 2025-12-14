import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';
import type { ContactFormData } from './validations';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_SECURE = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === 'true'
  : SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || process.env.GMAIL_USER;
const SMTP_PASS = process.env.SMTP_PASS || process.env.GMAIL_PASS;
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || SMTP_USER;
const SENDER_NAME = process.env.SENDER_NAME || 'Your Name';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || '';

if (!SMTP_USER || !SMTP_PASS) {
  // Do not throw at module load; createTransport will still be created but operations will fail with meaningful errors.
  console.warn('SMTP_USER or SMTP_PASS not set. Emails will not be sent until configured.');
}

const emailConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
};

const transporter: Transporter<SentMessageInfo> = nodemailer.createTransport(emailConfig);

export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email server verification failed:', error);
    return false;
  }
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, message } = data;

  const mailOptions = {
    from: `"${name || SENDER_NAME}" <${SMTP_FROM}>`,
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `Portfolio Contact: ${name || 'Visitor'}`,
    text: `Name: ${name || ''}\nEmail: ${email || ''}\n\nMessage:\n${message || ''}`,
    html: `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>
      body{font-family:Arial,Helvetica,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px}
      .container{background:#f9f9f9;border-radius:8px;padding:30px;margin:20px 0}
      .header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:20px;border-radius:8px 8px 0 0;margin:-30px -30px 20px -30px}
      .label{font-weight:700;color:#667eea;margin-bottom:5px}
      .value,.message-box{background:#fff;padding:12px;border-radius:4px;border-left:3px solid #667eea;white-space:pre-wrap;word-wrap:break-word}
      .footer{margin-top:30px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666;text-align:center}
      </style></head><body>
      <div class="container">
        <div class="header"><h1>📬 New Contact Form Submission</h1></div>
        <div class="label">Name:</div><div class="value">${escapeHtml(name || '')}</div>
        <div class="label">Email:</div><div class="value"><a href="mailto:${escapeHtml(email || '')}" style="color:#667eea;text-decoration:none">${escapeHtml(email || '')}</a></div>
        <div class="label">Message:</div><div class="message-box">${escapeHtml(message || '')}</div>
        <div class="footer"><p>This email was sent from your portfolio contact form. Reply directly to this email to respond to ${escapeHtml(name || 'the sender')}.</p></div>
      </div></body></html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendAutoReplyEmail(userEmail: string, userName = '') {
  if (!userEmail) throw new Error('Recipient email is required');

  const mailOptions = {
    from: `"${SENDER_NAME}" <${SMTP_FROM}>`,
    to: userEmail,
    subject: 'Thank you for contacting me!',
    html: `<!doctype html><html><head><meta charset="utf-8"><style>
      body{font-family:Arial,Helvetica,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px}
      .container{background:#f9f9f9;border-radius:8px;padding:30px}
      .header{text-align:center;margin-bottom:30px}.header h1{color:#667eea;margin:0}
      .content{background:#fff;padding:20px;border-radius:4px}.footer{margin-top:30px;padding-top:20px;border-top:1px solid #ddd;text-align:center;font-size:12px;color:#666}
      </style></head><body>
      <div class="container"><div class="header"><h1>✉️ Message Received!</h1></div>
      <div class="content"><p>Hi ${escapeHtml(userName || '')},</p>
      <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
      <p>I typically respond within 24-48 hours. If your matter is urgent, feel free to send a follow-up email.</p>
      <p>Best regards,<br><strong>${escapeHtml(SENDER_NAME)}</strong></p></div>
      <div class="footer"><p>This is an automated response. Please do not reply to this email.</p></div></div></body></html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent to:', userEmail, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send auto-reply:', error);
    return { success: false };
  }
}

export async function sendNewsletterConfirmation(email: string) {
  if (!email) throw new Error('Recipient email is required');

  const mailOptions = {
    from: `"${SENDER_NAME}" <${SMTP_FROM}>`,
    to: email,
    subject: 'Welcome to my newsletter!',
    html: `<!doctype html><html><head><meta charset="utf-8"><style>
      body{font-family:Arial,Helvetica,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px}
      .button{display:inline-block;padding:12px 30px;background:#667eea;color:#fff;text-decoration:none;border-radius:5px;margin:20px 0}
      </style></head><body>
      <h1>🎉 Welcome!</h1><p>Thank you for subscribing to my newsletter.</p><p>You'll receive updates about new projects, articles, and more.</p>
      ${APP_URL ? `<a href="${escapeHtml(APP_URL)}" class="button">Visit Portfolio</a>` : ''}
      </body></html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Newsletter confirmation sent to:', email, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Failed to send newsletter confirmation:', error);
    return { success: false };
  }
}

/* Simple in-memory rate limiting utilities */
const emailRateLimits = new Map<string, number[]>();
const DEFAULT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function checkEmailRateLimit(email: string, maxEmails = 3, windowMs = DEFAULT_WINDOW_MS): boolean {
  const now = Date.now();
  const timestamps = emailRateLimits.get(email) || [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= maxEmails) return false;

  recent.push(now);
  emailRateLimits.set(email, recent);
  return true;
}

export function cleanupEmailRateLimits(windowMs = DEFAULT_WINDOW_MS) {
  const now = Date.now();
  for (const [email, timestamps] of emailRateLimits.entries()) {
    const recent = timestamps.filter((t) => now - t < windowMs);
    if (recent.length === 0) emailRateLimits.delete(email);
    else emailRateLimits.set(email, recent);
  }
}

/* Minimal HTML escaper to reduce risk of injection in email bodies */
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
