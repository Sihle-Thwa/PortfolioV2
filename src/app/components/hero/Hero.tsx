"use client";
import Image from "next/image";
import heroBg from "../../../../public/PortfolioHeroImage.jpg";
import HeadlineBanner from "./HeadlineBanner";
import  Typewriter  from "../../styles/Typewriter";
import "./hero.css";

export default function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <Image
          className="hero__bg-image"
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <h1 className="hero__title">
          <Typewriter text="Siphesihle B. Mthethwa" />
        </h1>

        <div className="hero__subtitle">
          <p>
            <span>Building</span> better web experiences.
          </p>
          <p>
            <span>Turning</span> client ideas into reality.
          </p>
          <p>
            <span>Teaching</span> IT and Comp Sci.
          </p>
        </div>

        <div className="hero__ctas">
          <a href="#contact" className="hero__btn hero__btn--primary">
            Get in Touch
          </a>
          <a href="#about" className="hero__btn hero__btn--secondary">
            About Me
          </a>
        </div>
      </div>

      <div className="hero__bottom-strip">
        <span className="hero__location">📍 Based in Johannesburg, South Africa</span>
        <div className="hero__banner-wrap">
          <HeadlineBanner />
        </div>
      </div>
    </section>
  );
}
