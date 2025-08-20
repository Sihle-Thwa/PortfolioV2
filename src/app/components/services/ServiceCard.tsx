import type { Service } from "@/data/services";
import "./servicecard.css";

export default function ServiceCard({ service }: { service: Service }) {
    return (
        <div className="c-service">
            <h3 className="c-service-title">{service.title}</h3>
            <ul className="c-service-list">
                {service.bullets.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
