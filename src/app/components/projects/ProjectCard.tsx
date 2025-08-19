// app/components/projects/ProjectCard.tsx
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
            {project.image && (
                <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48"
                />
            )}
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                {project.tags && project.tags.length > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {project.tags.join(', ')}
                    </p>
                )}
                <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-500 hover:underline inline-flex items-center"
                >
                    View Project
                    {/* You could include an external link icon here for visual cue */}
                </a>
            </div>
        </div>
    );
}
