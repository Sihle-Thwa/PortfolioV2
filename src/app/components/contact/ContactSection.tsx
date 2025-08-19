// app/components/contact/ContactSection.tsx
"use client";
import { useEffect, useState } from "react";

export default function ContactSection() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update the time every minute
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Format the time as HH:MM (24-hour or 12-hour as preferred)
    const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <section id="contact" className="py-16 bg-white dark:bg-gray-900 text-center">
            <h2 className="text-3xl font-semibold mb-4">Let’s Make It Happen</h2>
            <p className="mb-8">Feel free to reach out via the form below or connect with me on social media.</p>

            {/* Contact Form (placeholder, no action) */}
            <form className="max-w-md mx-auto mb-8">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full mb-4 p-3 rounded border border-gray-300 dark:border-gray-700"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full mb-4 p-3 rounded border border-gray-300 dark:border-gray-700"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    className="w-full mb-4 p-3 rounded border border-gray-300 dark:border-gray-700 h-32"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
                >
                    Send Message
                </button>
            </form>

            {/* Local time and Back-to-top */}
            <div className="mb-8 text-gray-700 dark:text-gray-300">
                <span className="mr-4">📍 Local Time: {timeString}</span>
                <a
                    href="#top"
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="underline"
                >
                    Back to top
                </a>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6 text-2xl">
                <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>
                <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer">
                    Instagram
                </a>
            </div>
        </section>
    );
}
