// app/components/projects/ProjectsSection.tsx
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
            <h2 className="text-3xl font-semibold text-center mb-8">Projects</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                {projects.map(project => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </section>
    );
}
