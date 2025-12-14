"use client";
import { projects } from "../../../../data/projects";
import ProjectCard from "./ProjectCard";
import "./projectssection.css";

export default function ProjectsSection() {
	return (
		<section id="projects" className="c-projects">
			<h2 className="c-projects-title">Projects</h2>
			<div className="c-projects-grid">
				{projects.map((project, idx) => (
					<ProjectCard key={project.title ?? idx} project={project} />
				))}
			</div>
		</section>
	);
}