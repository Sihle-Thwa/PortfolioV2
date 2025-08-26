import { ReactNode } from "react";
import "./typewriter.css";

export default function Typewriter({ children }: { children: ReactNode }) {
    return (
        <div className="typewriter">
            {children}
        </div>
    );
}
