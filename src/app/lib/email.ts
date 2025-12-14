import nodemailer from "nodemailer";
import type { ContactFormData } from "./validations";

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASSWORD!,
  },
};

const transporter = nodemailer.createTransport(emailConfig);

export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log("✅ Email server is ready to send messages");
    return true;
  } catch (error) {
    console.error("❌ Email server verification failed:", error);
    return false;
  }
}

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, message } = data;

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: email, // This allows you to reply directly to the user
    subject: `Portfolio Contact: ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
              margin: 20px 0;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
              margin: -30px -30px 20px -30px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-weight: bold;
              color: #667eea;
              margin-bottom: 5px;
            }
            .value {
              background-color: white;
              padding: 12px;
              border-radius: 4px;
              border-left: 3px solid #667eea;
            }
            .message-box {
              background-color: white;
              padding: 15px;
              border-radius: 4px;
              border-left: 3px solid #667eea;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>
            
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">
                <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">
                  ${email}
                </a>
              </div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${message}</div>
            </div>
            
            <div class="footer">
              <p>This email was sent from your portfolio contact form.</p>
              <p>Reply directly to this email to respond to ${name}.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}

export async function sendAutoReplyEmail(userEmail: string, userName: string) {
  const mailOptions = {
    from: `"Your Name" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: userEmail,
    subject: "Thank you for contacting me!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #667eea;
              margin: 0;
            }
            .content {
              background-color: white;
              padding: 20px;
              border-radius: 4px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Message Received!</h1>
            </div>
            
            <div class="content">
              <p>Hi ${userName},</p>
              
              <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
              
              <p>I typically respond within 24-48 hours. If your matter is urgent, feel free to send a follow-up email.</p>
              
              <p>Best regards,<br>
              <strong>Your Name</strong></p>
            </div>
            
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Auto-reply sent to:", userEmail);
  } catch (error) {
    console.error("⚠️ Failed to send auto-reply:", error);
    // Don't throw error - auto-reply is optional
  }
}

/*
 *Future Newsletter Confirmation Email
 *export async function sendNewsletterConfirmation(email: string) {
 *if (!email) throw new Error("Recipient email is required");
 *  const mailOptions = {
 *    from: `"${SENDER_NAME}" <${SMTP_FROM}>`,
 *    to: email,
 *    subject: "Welcome to my newsletter!",
 *    html: `<!doctype html><html><head><meta charset="utf-8"><style>
 *      body{font-family:Arial,Helvetica,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px}
 *      .button{display:inline-block;padding:12px 30px;background:#667eea;color:#fff;text-decoration:none;border-radius:5px;margin:20px 0}
 *      </style></head><body>
 *      <h1>🎉 Welcome!</h1><p>Thank you for subscribing to my newsletter.</p><p>You'll receive updates about new projects, articles, and more.</p>
 *      ${
 *        APP_URL
 *          ? `<a href="${escapeHtml(
 *              APP_URL
 *            )}" class="button">Visit Portfolio</a>`
 *         : ""
 *      }
 *      </body></html>`,
 *  };
 *  try {
 *   const info = await transporter.sendMail(mailOptions);
 *    console.log("Newsletter confirmation sent to:", email, info.messageId);
 *    return { success: true, messageId: info.messageId };
 *  } catch (error) {
 *    console.error("Failed to send newsletter confirmation:", error);
 *    return { success: false };
 *  }
 *}
 */

/* Simple in-memory rate limiting utilities */
const emailRateLimits = new Map<string, number[]>();

export function checkEmailRateLimit(identifier: string, maxEmails: number = 36): boolean {
  const now = Date.now();
  const timestamps = emailRateLimits.get(identifier) || [];

  // Remove old timestamps outside the window
  const recentTimestamps = timestamps.filter(
    (time) => now - time < 60 * 60 * 1000
  ); // 1 hour window

  if (recentTimestamps.length >= maxEmails) {
    return false; // Rate limit exceeded
  }

  // Add current timestamp
  recentTimestamps.push(now);
  emailRateLimits.set(identifier, recentTimestamps);

  return true; // Within rate limit
}

export function cleanupEmailRateLimits() {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;

  for (const [identifier, timestamps] of emailRateLimits.entries()) {
    const recentTimestamps = timestamps.filter((time) => now - time < windowMs);
    if (recentTimestamps.length === 0) {
      emailRateLimits.delete(identifier);
    } else {
      emailRateLimits.set(identifier, recentTimestamps);
    }
  }
}
