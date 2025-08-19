// app/components/projects/ProjectsSection.tsx
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import "./projectssection.css";

export default function ProjectsSection() {
    return (
        <section id="projects" className="c-projects">
            <h2 className="c-projects-title">Projects</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {projects.map(project => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </section>
    );
}
