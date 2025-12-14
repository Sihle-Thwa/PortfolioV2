import React, { useState } from "react";
import { skills } from "@/data/skills";
import SkillGroup from "./SkillGroup";
import SkillsCarousel from "./SkillsCarousel";
import "./skillsection.css";

type ViewMode = "groups" | "carousel";

export default function SkillSection() {
	const [viewMode, setViewMode] = useState<ViewMode>("groups");

	return (
		<section id="skills" className="c-skill">
			<h2 className="c-skill-title">Skills</h2>

			{/* View toggle */}
			<fieldset className="c-skill-toggle" aria-label="Skills view">
				<legend className="sr-only">Choose skills view</legend>

				<label className="c-skill-toggle-option">
					<input
						type="radio"
						name="skills-view"
						value="groups"
						checked={viewMode === "groups"}
						onChange={() => setViewMode("groups")}
					/>
					<span>Standard</span>
				</label>

				<label className="c-skill-toggle-option">
					<input
						type="radio"
						name="skills-view"
						value="carousel"
						checked={viewMode === "carousel"}
						onChange={() => setViewMode("carousel")}
					/>
					<span>Carousel</span>
				</label>
			</fieldset>

			{/* Content */}
			{viewMode === "groups" ? (
				<div className="c-skill-grid" role="list">
					{skills.map((group, idx) => (
						<SkillGroup
							key={`${group.category}-${idx}`}
							category={group.category}
							skills={group.skills}
						/>
					))}
				</div>
			) : (
				<div className="c-skill-carousel-wrap">
					<SkillsCarousel />
				</div>
			)}
		</section>
	);
}
