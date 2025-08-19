"use client"
import Image from "next/image";
import "./aboutsection.css";

// app/components/about/AboutSection.tsx
export default function AboutSection() {
    return (
        <section id="about" className="c-about">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="md:w-1/2 px-4">
                    <h2 className="c-about-title">About Me</h2>
                    <p className="c-about-text">
                        I am a dedicated developer with a passion for building efficient and scalable web applications.
                        I love turning ideas into reality using creative solutions.
                    </p>
                    <p className="c-about-muted">
                        With experience in both frontend and backend development, I continuously seek out new technologies
                        and stay up-to-date with industry trends to deliver modern, high-quality results.
                    </p>
                </div>
                {/* Image Content */}
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <Image
                        src="" //Fix this
                        alt="Profile picture"
                        className="c-about-image"
                        fill={true}
                    />
                </div>
            </div>
        </section>
    );
}
