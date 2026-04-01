"use client";
import "./headlinebanner.css";

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

export default function HeadlineBanner() {
  const doubled = [...headlines, ...headlines];
  return (
    <div className="banner">
      <div className="banner__track">
        {doubled.map((h, i) => (
          <span className="banner__chip" key={`${h}-${i}`}>{h}</span>
        ))}
      </div>
    </div>
  );
}