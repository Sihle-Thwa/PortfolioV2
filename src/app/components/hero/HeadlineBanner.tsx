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
				{headlines.map((headline) => (
					<div className="headline-pill" key={headline}>
						{headline}
					</div>
				))}
			</div>
		</div>
	);
};

export default HeadlineBanner;
