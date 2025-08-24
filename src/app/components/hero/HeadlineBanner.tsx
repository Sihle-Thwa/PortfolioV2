import "./headlinebaner.css";

export default function HeadlineBanner() {
    const headlines = [
        "Full Stack Developer",
        "Web Development",
        "UI/UX Designer",
        "API Development",
        "Cloud Computing",
        "EdTech",
        "Curriculum Development",
        "IT/Comp Sci Educator",
        "Web Tech Enthusiast"
    ];

    return (
        <div className="headline-banner">
            <div className="headline-banner-content">
                {headlines.map((headline, index) => (
                    <div className="headline-pill" key={index}>
                        {headline}
                    </div>
                ))}
            </div>
        </div>
    );
}