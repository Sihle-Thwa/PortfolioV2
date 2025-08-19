// app/components/services/ServicesSection.tsx
import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";
import "./servicesection.css"

export default function ServicesSection() {
    return (
        <section id="services" className="c-services">
            <h2 className="c-services-title">Services</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {services.map(service => (
                    <ServiceCard key={service.title} service={service} />
                ))}
            </div>
        </section>
    );
}
