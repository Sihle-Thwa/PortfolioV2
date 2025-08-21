import { useEffect, useState } from "react";
import "./contactsection.css";

export default function ContactSection() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <section id="contact" className="c-contact">
            <h2 className="c-contact-title">Let’s Make It Happen</h2>
            <p className="c-contact-subtitle">
                Feel free to reach out via the form below or connect with me on social
                media.
            </p>

            <form className="c-contact-form">
                <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your Name"
                    className="c-contact-input"
                />
                <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Your Email"
                    className="c-contact-input"
                />
                <textarea
                    name="message"
                    autoComplete="message"
                    placeholder="Your Message"
                    className="c-contact-textarea"
                />
                <button type="submit" className="c-contact-submit">
                    Send Message
                </button>
            </form>

            <div className="c-contact-meta">
                <div className="mr-4">📍 Local Time: {timeString}</div>
                <a
                    href="#top"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="c-contact-link"
                >
                    Back to top
                </a>
            </div>

            <div className="c-contact-links">
                <a
                    href="https://linkedin.com/in/siphesihle-mthethwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="c-contact-link"
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/Sihle-Thwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="c-contact-link"

                >
                    GitHub
                </a>
                <a
                    href="https://instagram.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="c-contact-link"

                >
                    Instagram
                </a>
            </div>
        </section>
    );
}
