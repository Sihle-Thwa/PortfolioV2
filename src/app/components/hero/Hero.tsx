import "./hero.css";
export default function Hero() {
    return (
        <section id="home" className="c-hero">
            <div className="c-hero-content">
                <h1 className="c-hero-title">Siphesihle B. Mthethwa</h1>
                <p className="c-hero-subtitle">
                    Turning creative ideas into reality.
                    <br />
                    Building better web experiences.
                    <br />
                    Teaching IT and Comp Sci.
                </p>
                <div className="c-hero-actions">
                    <a href="#projects" className=" c-hero-button c-hero-button-primary">
                        View Work
                    </a>
                    <a href="#contact" className="c-hero-button c-hero-button-ghost">
                        Get in Touch
                    </a>
                </div>
            </div>

        </section>
    );
}
