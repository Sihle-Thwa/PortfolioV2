import "./hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Hero() {

    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // avoid hydration mismatch by waiting for client mount
    useEffect(() => setMounted(true), []);

    const lightSlides = [
        { src: "/sand-bg-1.png", alt: "Background 1" },
        { src: "/sand-bg-2.png", alt: "Background 2" },
        { src: "/sand-bg-3.png", alt: "Background 3" },
    ];

    const darkSlides = [
        { src: "/charcoal-bg-1.png", alt: "Background 1" },
        { src: "/charcoal-bg-2.png", alt: "Background 2" },
        { src: "/offwhite-bg-1.jpg", alt: "Background 3" },
    ];

    // figure out which theme is active (light/dark)
    const activeTheme = theme === "system" ? systemTheme : theme;
    const slides = activeTheme === "dark" ? darkSlides : lightSlides;

    if (!mounted) {
        // render nothing or a placeholder until mounted (prevents mismatch)
        return <section id="home" className="creative-bg--slider" />;
    }

    return (
        <section id="home" className="creative-bg--slider">
            {/* Background slider */}
            <div className="creative-slider--wrap">
                <Swiper
                    className="creative-slider"
                    modules={[Autoplay, EffectFade, A11y]}
                    effect="fade"
                    speed={1000}
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ delay: 8000, disableOnInteraction: false }}
                    loop
                    allowTouchMove={false}
                    aria-hidden
                >
                    {slides.map((s, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="slide-bg"
                                style={{ backgroundImage: `url(${s.src})` }}
                                role="img"
                                aria-label={s.alt}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Foreground content (your old hero content) */}
            <div className="slider-content">
                <div className="content-row">
                    <div className="content-column">
                        <h1 className="slide-heading">Siphesihle B. Mthethwa</h1>
                        <p className="slide-subheading">
                            Turning creative ideas into reality.
                            <br />
                            Building better web experiences.
                            <br />
                            Teaching IT and Comp Sci.
                        </p>
                        <div className="creative-buttons--wrap">
                            <a href="#projects" className="creative-button">
                                <span className="button-animate-y">
                                    <span className="button-animate-y-1">View Work</span>
                                    <span className="button-animate-y-2" aria-hidden="true">View Work</span>
                                </span>
                            </a>
                            <a href="#contact" className="creative-button button-fill">
                                <span className="button-animate-y">
                                    <span className="button-animate-y-1">Get in Touch</span>
                                    <span className="button-animate-y-2" aria-hidden="true">Get in Touch</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="creative-status">
                    Based in South Africa, Johannesburg
                </div>
            </div>
        </section>
    );
}
