import "./hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Typewriter from "@/app/styles/Typewriter";
import HeadlineBanner from "./HeadlineBanner";

export default function Hero() {

    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

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

    const activeTheme = theme === "system" ? systemTheme : theme;
    const slides = activeTheme === "dark" ? darkSlides : lightSlides;

    if (!mounted) {

        return <section id="home" className="hero-bg--slider" />;
    }

    return (
        <section id="home" className="hero-bg--slider">
            {/* Background slider */}
            <div className="hero-slider--wrap">
                <Swiper
                    className="hero-slider"
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

            <div className="slider-content">
                <div className="content-row">
                    <div className="content-column">
                        <h1 className="slide-heading">
                            <Typewriter>Siphesihle B. Mthethwa</Typewriter>
                        </h1>
                        <p className="slide-subheading">
                            <span className="slide-subheading-token">
                                Turning
                            </span> hero ideas into reality.
                            <br />
                            <span className="slide-subheading-token">
                                Building
                            </span> better web experiences.
                            <br />
                            <span className="slide-subheading-token">
                                Teaching
                            </span> IT and Comp Sci.
                        </p>
                        <div className="hero-buttons--wrap">
                            <a href="#projects" className="hero-button">
                                <span className="button-animate-y">
                                    <span className="button-animate-y-1">View Work</span>
                                    <span className="button-animate-y-2" aria-hidden="true">View Work</span>
                                </span>
                            </a>
                            <a href="#contact" className="hero-button button-fill">
                                <span className="button-animate-y">
                                    <span className="button-animate-y-1">Get in Touch</span>
                                    <span className="button-animate-y-2" aria-hidden="true">Get in Touch</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero-bottom-wrap">
                <div className="hero-status">
                    Based in South Africa, Johannesburg
                </div>
                <div className="hero-banner">
                    <HeadlineBanner />

                </div>
            </div>
        </section>
    );
}
