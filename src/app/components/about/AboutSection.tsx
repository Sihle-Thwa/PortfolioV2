"use client";
import Image from "next/image";
import profileImg from "../../../../public/AnimatedPortrait.png";
import "./aboutsection.css";

export default function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        <div className="about__text-block">
          <h2 className="about__heading">About Me</h2>
          <p className="about__paragraph">
            I am a passionate Full-Stack Web Developer and IT &amp; Computer
            Science Educator with a strong foundation in building modern,
            scalable, and user-centric applications. My journey began with Java,
            SQL, HTML, and CSS, and has since expanded to mastering JavaScript,
            Python, and C, along with frameworks like Next.js, React.js,
            Node.js, Express.js, TailwindCSS, and MaterialUI.
          </p>
          <p className="about__paragraph about__paragraph--muted">
            I specialise in developing robust APIs, responsive interfaces, and
            database-driven solutions using MySQL, PostgreSQL, MongoDB, and
            Microsoft SQL Server. Whether it&apos;s building enterprise-scale
            applications or refining user experiences, I thrive on transforming
            complex challenges into elegant, practical solutions.
          </p>
          <p className="about__paragraph about__paragraph--muted">
            I enjoy mentoring the next generation of developers, bridging theory
            with industry practice, and fostering curiosity and problem-solving
            skills in IT and Computer Science. Beyond the classroom and building
            applications, I&apos;m dedicated to continuous learning, innovation,
            and contributing to impactful projects.
          </p>
        </div>

        <div className="about__image-block">
          <Image
            className="about__portrait"
            src={profileImg}
            alt="Siphesihle B. Mthethwa portrait"
          />
        </div>
      </div>
    </section>
  );
}
