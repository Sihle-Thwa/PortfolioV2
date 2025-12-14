"use client";
import ContactForm from "../../forms/contact-form";
import { Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section 
      id="contact" 
      className="py-20"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h2 id="contact-heading" className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <aside 
            className="space-y-8"
            aria-labelledby="contact-info-heading"
          >
            <div>
              <h3 
                id="contact-info-heading" 
                className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100"
              >
                Contact Information
              </h3>
              <address className="space-y-6 not-italic">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:infosbmconcepts@gmail.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                      aria-label="Send email to infosbmconcepts@gmail.com"
                    >
                      infosbmconcepts@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Johannesburg, South Africa
                    </p>
                  </div>
                </div>
              </address>
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Response Time:</strong> I typically respond to messages within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </aside>

          {/* Contact Form */}
          <main 
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            aria-labelledby="contact-form-heading"
          >
            <h3 
              id="contact-form-heading" 
              className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100"
            >
              Send me a message
            </h3>
            <ContactForm />
          </main>
        </div>
      </div>
    </section>
  );
}
