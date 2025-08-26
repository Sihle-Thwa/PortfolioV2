import { projects } from "../../../data/projects";
import ProjectCard from "./ProjectCard";
import "./Projectssection.css";

export default function ProjectsSection() {
	return (
		<section id="projects" className="c-projects">
			<h2 className="c-projects-title">Projects</h2>
			<div className="c-projects-grid">
				{projects.map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</div>
		</section>
	);
}
