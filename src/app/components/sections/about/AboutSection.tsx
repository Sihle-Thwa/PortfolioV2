"use client";
import Image from "next/image";
import "./aboutsection.css";

export default function AboutSection() {
  return (
    <section id="about" className="c-about">
      <div className="c-about-inner">
        <div className="c-about-textblock">
          <h2 className="c-about-title">About Me</h2>
          <p className="c-about-text">
            I am a passionate Full-Stack Web Developer and IT & Computer Science
            Educator with a strong foundation in building modern, scalable, and
            user-centric applications. My journey began with Java, SQL, HTML,
            and CSS, and has since expanded to mastering JavaScript, Python, and
            C, along with frameworks and technologies like Next.js, React.js,
            Node.js, Express.js, TailwindCSS, and MaterialUI.
          </p>
          <p className="c-about-muted">
            I specialise in developing robust APIs, responsive interfaces, and
            database-driven solutions using MySQL, PostgreSQL, MongoDB, and
            Microsoft SQL Server. Whether it’s building enterprise-scale
            applications or refining user experiences, I thrive on transforming
            complex challenges into elegant, practical solutions.
          </p>
          <br />
          <p className="c-about-muted">
            I enjoy mentoring the next generation of developers, bridging theory
            with industry practice, and fostering curiosity and problem-solving
            skills in IT and Computer Science. Beyond the classroom and code
            editor, I’m dedicated to continuous learning, innovation, and
            contributing to impactful projects that make technology more
            accessible and meaningful.
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
