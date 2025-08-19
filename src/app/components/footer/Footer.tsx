// app/components/footer/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <p className="mb-2 md:mb-0">
                    &copy; {new Date().getFullYear()} Siphesihle B. Mthethwa. All rights reserved.
                </p>
                <div>
                    <a href="#services" className="mx-2 hover:underline">Services</a>
                    <a href="#projects" className="mx-2 hover:underline">Works</a>
                    <a href="#about" className="mx-2 hover:underline">About</a>
                    <a href="#contact" className="mx-2 hover:underline">Contact</a>
                </div>
            </div>
        </footer>
    );
}
