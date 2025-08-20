import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";
import "./servicesection.css"

export default function ServicesSection() {
    return (
        <section id="services" className="c-services">
            <h2 className="c-services-title">Services</h2>
            <div className="c-services-grid">
                {services.map(service => (
                    <ServiceCard key={service.title} service={service} />
                ))}
            </div>
        </section>
    );
}
