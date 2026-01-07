import ContactForm from "../../forms/contact-form";
import { Mail, MapPin } from "lucide-react"; 
import "./contactsection.css";

export default function ContactSection() {
  return (
    <div 
      id="contact" 
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-container">
        <div className="contact-header">
          <div id="contact-heading" className="contact-title">
            Get In Touch
          </div>
          <div className="contact-subtitle">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </div>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div 
            className="contact-info"
            aria-labelledby="contact-info-heading"
          >
            <div className="contact-info-wrapper">
              <div 
                id="contact-info-heading" 
                className="contact-info-title"
              >
                Contact Information
              </div>
              <div className="contact-address">
                <div className="contact-item">
                  <div 
                    className="contact-icon-wrapper contact-icon-wrapper--email"
                    aria-hidden="true"
                  >
                    <Mail className="contact-icon" size={24} />
                  </div>
                  <div className="contact-details">
                    <div className="contact-label">
                      Email
                    </div>
                    <a
                      href="mailto:infosbmconcepts@gmail.com"
                      className="contact-link"
                      aria-label="Send email to infosbmconcepts@gmail.com"
                    >
                      infosbmconcepts@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div 
                    className="contact-icon-wrapper contact-icon-wrapper--location"
                    aria-hidden="true"
                  >
                    <MapPin className="contact-icon" size={24} />
                  </div>
                  <div className="contact-details">
                    <div className="contact-label">
                      Location
                    </div>
                    <div className="contact-text">
                      Johannesburg, South Africa
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-response-info">
                <div className="contact-response-text">
                  <strong>Response Time:</strong> I typically respond to messages within 24-48 hours during business days.
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <main 
            className="contact-form-section"
            aria-labelledby="contact-form-heading"
          >
            <div 
              id="contact-form-heading" 
              className="contact-form-title"
            >
              Send me a message
            </div>
            <ContactForm />
          </main>
        </div>
      </div>
    </div>
  );
}