import Image from "next/image";

// app/components/about/AboutSection.tsx
export default function AboutSection() {
    return (
        <section id="about" className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center">
                {/* Text Content */}
                <div className="md:w-1/2 px-4">
                    <h2 className="text-3xl font-semibold mb-4">About Me</h2>
                    <p className="mb-4">
                        I am a dedicated developer with a passion for building efficient and scalable web applications.
                        I love turning ideas into reality using creative solutions.
                    </p>
                    <p>
                        With experience in both frontend and backend development, I continuously seek out new technologies
                        and stay up-to-date with industry trends to deliver modern, high-quality results.
                    </p>
                </div>
                {/* Image Content */}
                <div className="md:w-1/2 px-4 mt-8 md:mt-0 text-center">
                    {/* Placeholder image; replace with actual image path in /public/images */}
                    <Image
                        src="/images/profile-placeholder.jpg"
                        alt="Profile picture"
                        className="inline-block w-2/3 rounded-lg shadow-md"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </section>
    );
}
