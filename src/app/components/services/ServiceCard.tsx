// app/components/services/ServiceCard.tsx
import type { Service } from "@/data/services";

export default function ServiceCard({ service }: { service: Service }) {
    return (
        <div className="p-6 rounded-lg shadow bg-gray-100 dark:bg-gray-800">
            <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {service.bullets.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
