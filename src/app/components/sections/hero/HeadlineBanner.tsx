import "./headlinebanner.css";
import React from "react";

const HeadlineBanner: React.FC = () => {
	const headlines = [
		"Full Stack Developer",
		"Web Development",
		"UI/UX Designer",
		"API Development",
		"Cloud Computing",
		"EdTech",
		"Curriculum Development",
		"IT/Comp Sci Educator",
		"Web Tech Enthusiast",
	];

	return (
		<div className="headline-banner">
			<div className="headline-banner-content">
				{/* Duplicate the content for seamless marquee effect */}
				{[...headlines, ...headlines].map((headline, index) => (
					<div className="headline-pill" key={`${headline}-${index}`}>
						{headline}
					</div>
				))}
			</div>
		</div>
	);
};

export default HeadlineBanner;
