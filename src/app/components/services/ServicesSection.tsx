// app/components/services/ServicesSection.tsx
import { services } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
    return (
        <section id="services" className="py-16 bg-white dark:bg-gray-900">
            <h2 className="text-3xl font-semibold text-center mb-8">Services</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {services.map(service => (
                    <ServiceCard key={service.title} service={service} />
                ))}
            </div>
        </section>
    );
}
