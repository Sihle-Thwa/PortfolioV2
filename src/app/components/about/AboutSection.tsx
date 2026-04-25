"use client"
import Image from "next/image"
import profileImg from "../../../../public/AnimatedPortrait.png"
import "./aboutsection.css"

export default function AboutSection() {
	return (
		<section className="about-section" id="about">
			<div className="about-container">
				<div className="about-text-block">
					<h2 className="about-heading">
						Building Scalable Systems & Mentoring Engineers
					</h2>

					<p className="about-paragraph">
						I am a <strong>Full-Stack Developer and CS Educator</strong>{" "}
						dedicated to transforming complex architectural challenges into
						elegant, production-ready solutions. With a foundation rooted in
						Java and C, I bridge the gap between low-level performance and
						modern web scalability.
					</p>

					<div className="about-skills-grid">
						<div className="about-skill-card">
							<h3 className="about-skill-title">Frontend</h3>
							<p className="about-skill-desc">
								Crafting responsive, accessible interfaces with{" "}
								<strong>Next.js, React, and TailwindCSS.</strong>
							</p>
						</div>

						<div className="about-skill-card">
							<h3 className="about-skill-title">Backend & APIs</h3>
							<p className="about-skill-desc">
								Architecting robust server-side logic using{" "}
								<strong>Node.js, Express, and Python.</strong>
							</p>
						</div>

						<div className="about-skill-card">
							<h3 className="about-skill-title">Data Architecture</h3>
							<p className="about-skill-desc">
								Designing high-availability database solutions across{" "}
								<strong>PostgreSQL, MongoDB, and SQL Server.</strong>
							</p>
						</div>
					</div>

					<p className="about-paragraph about-paragraph--culture">
						I don’t just write code; I foster a culture of excellence. My
						background in IT education allows me to bridge the gap between
						theoretical computer science and industry-standard DevOps practices,
						ensuring every project is{" "}
						<strong>secure, scalable, and built to last.</strong>
					</p>
				</div>

				<div className="about-image-block">
					<Image
						className="about-portrait"
						src={profileImg}
						alt="Siphesihle B. Mthethwa portrait"
					/>
				</div>
			</div>
		</section>
	)
}
