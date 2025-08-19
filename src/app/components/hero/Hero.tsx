// app/components/hero/Hero.tsx
import "./hero.css";
export default function Hero() {
    return (
        <section id="home" className="c-hero">
            <h1 className="c-hero-title">Siphesihle B. Mthethwa</h1>
            <p className="c-hero-subtitle">
                Full‑Stack Developer crafting minimal, modern web experiences.
            </p>
            <div className="c-hero-actions">
                <a href="#projects" className="c-hero-button-primary">
                    View Work
                </a>
                <a href="#contact" className="c-hero-button-ghost">
                    Get in Touch
                </a>
            </div>
        </section>
    );
}
