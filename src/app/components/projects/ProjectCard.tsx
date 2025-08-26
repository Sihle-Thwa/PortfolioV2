import Image from "next/image";
import type { Project } from "@/data/projects";
import "./projectcard.css";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
	return (
		<article className="c-project">
			{project.image && (
				<Image
					src={project.image}
					alt={project.title}
					width={600}
					height={400}
					className="c-project-media"
					priority
					sizes="(max-width: 600px) 100vw, 600px"
				/>
			)}
			<div className="c-project-body">
				<h3 className="c-project-title">{project.title}</h3>
				<div className="c-project-subtitle">{project.subtitle}</div>
				{project.tags && project.tags.length > 0 && (
					<p className="c-project-tags">{project.tags.join(", ")}</p>
				)}
				<Link
					href={
						typeof project.codebase === "string" &&
						project.codebase.startsWith("http")
							? project.codebase
							: "#"
					}
					target="_blank"
					rel="noopener noreferrer"
					className="c-project-link"
					aria-disabled={
						!(
							typeof project.codebase === "string" &&
							project.codebase.startsWith("http")
						)
					}
				>
					View Code →
				</Link>
				<Link
					href={
						typeof project.href === "string" && project.href.startsWith("http")
							? project.href
							: "#"
					}
					target="_blank"
					rel="noopener noreferrer"
					className="c-project-link"
					aria-disabled={
						!(
							typeof project.href === "string" &&
							project.href.startsWith("http")
						)
					}
				>
					View Project →
				</Link>
			</div>
		</article>
	);
}
