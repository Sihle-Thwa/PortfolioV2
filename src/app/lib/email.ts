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
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>New Contact Form Submission</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset and base styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    
    /* Main styles */
    body {
      margin: 0 !important;
      padding: 0 !important;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, Helvetica, sans-serif;
      color: #333333;
      background-color: #f6f6f6;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .field-group {
      margin-bottom: 20px;
    }
    .field-label {
      font-weight: 600;
      color: #667eea;
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field-value {
      background-color: #f8f9ff;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #667eea;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .field-value a {
      color: #667eea;
      text-decoration: none;
    }
    .field-value a:hover {
      text-decoration: underline;
    }
    .message-content {
      white-space: pre-wrap;
      line-height: 1.6;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
      border-top: 1px solid #e9ecef;
    }
    
    /* Responsive styles */
    @media screen and (max-width: 480px) {
      .email-container { margin: 10px; }
      .header, .content { padding: 20px 15px; }
      .header h1 { font-size: 20px; }
    }
  </style>
</head>
<body role="document" aria-label="New contact form submission email">
  <div class="email-container" role="main">
    <header class="header" role="banner">
      <h1>📬 New Contact Form Submission</h1>
    </header>
    
    <div class="content" role="article">
      <div class="field-group">
        <div class="field-label" role="term">Contact Name</div>
        <div class="field-value" role="definition">${escapeHtml(name || 'Not provided')}</div>
      </div>
      
      <div class="field-group">
        <div class="field-label" role="term">Email Address</div>
        <div class="field-value" role="definition">
          <a href="mailto:${escapeHtml(email || '')}" aria-label="Reply to ${escapeHtml(name || 'sender')} at ${escapeHtml(email || '')}"
            >${escapeHtml(email || 'Not provided')}</a>
        </div>
      </div>
      
      <div class="field-group">
        <div class="field-label" role="term">Message Content</div>
        <div class="field-value message-content" role="definition">${escapeHtml(message || 'No message provided')}</div>
      </div>
    </div>
    
    <footer class="footer" role="contentinfo">
      <p><strong>Portfolio Contact Form</strong></p>
      <p>This email was sent from your portfolio contact form on ${new Date().toLocaleDateString()}.</p>
      <p>Reply directly to this email to respond to ${escapeHtml(name || 'the sender')}.</p>
    </footer>
  </div>
</body>
</html>`,
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
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Thank you for your message</title>
  <style>
    /* Reset and base styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    
    body {
      margin: 0 !important;
      padding: 0 !important;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, Helvetica, sans-serif;
      color: #333333;
      background-color: #f6f6f6;
      line-height: 1.6;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .content p {
      margin: 0 0 16px 0;
    }
    .highlight {
      background-color: #f0f7ff;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #667eea;
      margin: 20px 0;
    }
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e9ecef;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6c757d;
      border-top: 1px solid #e9ecef;
    }
    
    @media screen and (max-width: 480px) {
      .email-container { margin: 10px; }
      .header, .content { padding: 20px 15px; }
    }
  </style>
</head>
<body role="document" aria-label="Auto-reply confirmation email">
  <div class="email-container" role="main">
    <header class="header" role="banner">
      <h1>✉️ Message Received!</h1>
    </header>
    
    <div class="content" role="article">
      <p><strong>Hi ${escapeHtml(userName || 'there')},</strong></p>
      
      <p>Thank you for reaching out through my portfolio contact form! I've successfully received your message and wanted to confirm that it's in my inbox.</p>
      
      <div class="highlight" role="note">
        <p><strong>What happens next?</strong></p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>I typically respond to all messages within 24-48 hours during business days</li>
          <li>For urgent matters, feel free to send a follow-up email</li>
          <li>I'll reach out to you directly at the email address you provided</li>
        </ul>
      </div>
      
      <p>I look forward to connecting with you and discussing your project or inquiry in more detail.</p>
      
      <div class="signature">
        <p>Best regards,</p>
        <p><strong>${escapeHtml(SENDER_NAME)}</strong></p>
        <p style="font-size: 14px; color: #6c757d;">Full-Stack Developer & Software Engineer</p>
      </div>
    </div>
    
    <footer class="footer" role="contentinfo">
      <p><strong>Automated Response</strong></p>
      <p>This is an automated confirmation email. Please do not reply to this message.</p>
      <p>If you need immediate assistance, please send a new email to your original recipient.</p>
    </footer>
  </div>
</body>
</html>`,
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
