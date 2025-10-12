import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { ok: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { ok: false, error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Check for required environment variables
        if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
            console.error("Missing email configuration");
            return NextResponse.json(
                { ok: false, error: "Server configuration error" },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: "sbcmthethwa79@gmail.com",
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
            html: `
                <h3>New Portfolio Contact Message</h3>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Email send error:", err);
        return NextResponse.json(
            { ok: false, error: "Failed to send message" },
            { status: 500 }
        );
    }
}