import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
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
            subject: `New message from ${name}`,
            text: `From: ${name} <${email}>\n\n${message}`,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Email error:", err);
        return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
    }
}
