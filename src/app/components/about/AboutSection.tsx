"use client";
import Image from "next/image";
import "./aboutsection.css";

/**
 * AboutSection component displays information about the developer,
 * including a brief bio and a profile image.
 * This component does not accept any props.
 */
export default function AboutSection() {
    return (
        <section id="about" className="c-about">
            <div className="c-about-inner">
                <div className="c-about-textblock">
                    <h2 className="c-about-title">About Me</h2>
                    <p className="c-about-text">
                        I am a dedicated developer with a passion for building efficient and
                        scalable web applications. I love turning ideas into reality using
                        creative solutions.
                    </p>
                    <p className="c-about-muted">
                        With experience in both frontend and backend development, I
                        continuously seek out new technologies and stay up-to-date with
                        industry trends to deliver modern, high-quality results.
                    </p>
                </div>
                <div className="c-about-imagewrap">
                    <Image
                        src="/AnimatedPortrait.png"
                        alt="Profile picture"
                        className="c-about-image"
                        width={640}
                        height={640}
                    />
                </div>
            </div>
        </section>
    );
}
