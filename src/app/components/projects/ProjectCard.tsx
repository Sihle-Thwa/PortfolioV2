"use client";
import Image from "next/image"
import type { Project } from "@/data/projects"
import { Code2, Globe } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<div className="c-project">
			{project.image && (
				<Image
					src={project.image}
					alt={project.title}
                    width={400}
					height={175}
					className="c-project-media"
					priority
				/>
			)}
			<div className="c-project-body">
				<h3 className="c-project-title">{project.title}</h3>
				<div className="c-project-subtitle">{project.subtitle}</div>
				{project.tags && project.tags.length > 0 && (
					<p className="c-project-tags">{project.tags.join(", ")}</p>
				)}
                <div className="c-project-links">
                {project.href && (
                <a
					href={project.href}
					target="_blank"
					rel="noopener noreferrer"
					className="c-project-link-site">
					View Site 
                    <Globe size={16} style={{ marginLeft: "4px" }} />
				</a>
                )}
                {project.codebase && (
                <a
					href={project.codebase}
					target="_blank"
					rel="noopener noreferrer"
					className="c-project-link-code">
					View Code 
                    <Code2 size={16} style={{ marginLeft: "4px" }} />
				</a>
                )}
                </div>
				
			</div>
		</div>
	)
}
