"use client";
import { useState } from "react";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";
import "./contactsection.css";

export default function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
 
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
 
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send message.";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <div className="contact__header">
          <h2 className="contact__title">Get In Touch</h2>
          <p className="contact__subtitle">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="contact__grid">
          {/* Info Block */}
          <div className="contact__info-block">
            <h3 className="contact__info-title">Contact Information</h3>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <Mail size={22} />
              </div>
              <div>
                <p className="contact__info-label">Email</p>
                <a className="contact__info-link" href="mailto:infosbmconcepts@gmail.com">
                  infosbmconcepts@gmail.com
                </a>
              </div>
            </div>

            <div className="contact__info-card">
              <div className="contact__info-icon">
                <MapPin size={22} />
              </div>
              <div>
                <p className="contact__info-label">Location</p>
                <p className="contact__info-value">Johannesburg, South Africa</p>
              </div>
            </div>

            <div className="contact__response-note">
              <p>
                <strong>Response Time:</strong> I typically respond within 24-48 hours during business days.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="contact__form" onSubmit={handleSubmit}>
            <h3 className="contact__form-title">Send me a message</h3>

            <div className="contact__field-group">
              <label className="contact__label" htmlFor="name">Name</label>
              <input
                className="contact__input"
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="contact__field-group">
              <label className="contact__label" htmlFor="email">Email</label>
              <input
                className="contact__input"
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="contact__field-group">
              <label className="contact__label" htmlFor="message">Message</label>
              <textarea
                className="contact__textarea"
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
              />
            </div>

            <button className="contact__submit-btn" type="submit" disabled={loading}>
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {loading ? "Sending…" : "Send Message"}
            </button>
            <p className="contact__disclaimer">
              Your information is safe and will never be shared.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}