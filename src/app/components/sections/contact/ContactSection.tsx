import ContactForm from '../../forms/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    
                     <a href="mailto:your.email@example.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                    >
                      your.email@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    
                      <a  href="tel:+1234567890"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your City, Country
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}