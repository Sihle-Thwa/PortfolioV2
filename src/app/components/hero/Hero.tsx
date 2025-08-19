// app/components/hero/Hero.tsx
export default function Hero() {
    return (
        <section id="home" className="hero min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Siphesihle B. Mthethwa
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-xl">
                Full-Stack Developer passionate about crafting interactive web experiences.
            </p>
        </section>
    );
}
