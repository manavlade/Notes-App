import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Sparkles,
    Shield,
    Cloud,
    ArrowRight,
    PenLine,
    Layout,
    Lock
} from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

            <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm mb-4">
                        <Sparkles className="h-4 w-4" />
                        Smart Notes for Modern Minds
                    </div>

                    <h1 className="text-5xl font-bold leading-tight text-gray-900">
                        Capture ideas instantly.
                        <span className="text-blue-600"> Stay organized forever.</span>
                    </h1>

                    <p className="mt-6 text-gray-600 text-lg">
                        NotesApp helps you write, organize, and manage your thoughts
                        effortlessly. Simple. Fast. Secure. Built for productivity.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link to="/signup">
                            <Button size="lg" className="gap-2">
                                Get Started <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>

                        <Link to="/create-note">
                            <Button size="lg" variant="outline">
                                Try Demo
                            </Button>
                        </Link>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                        No credit card required • Free forever plan
                    </p>
                </div>

                {/* HERO IMAGE / UI PREVIEW */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-blue-100 blur-2xl opacity-40 rounded-3xl"></div>

                    <div className="relative bg-white border rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold">My Notes</span>
                            <PenLine className="h-5 w-5 text-blue-600" />
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                📌 Build Notes App UI
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                🚀 Learn Prisma + PostgreSQL
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                🔐 Improve Authentication System
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/* FEATURES */}
            <section className="max-w-7xl mx-auto px-6 py-20">

                <h2 className="text-3xl font-bold text-center mb-12">
                    Everything you need to stay productive
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <FeatureCard
                        icon={<Layout className="h-6 w-6 text-blue-600" />}
                        title="Organized Workspace"
                        desc="Keep all your notes structured and easy to access anytime."
                    />

                    <FeatureCard
                        icon={<Cloud className="h-6 w-6 text-blue-600" />}
                        title="Cloud Sync"
                        desc="Your notes are always saved and accessible across devices."
                    />

                    <FeatureCard
                        icon={<Lock className="h-6 w-6 text-blue-600" />}
                        title="Secure Access"
                        desc="JWT authentication keeps your notes private and safe."
                    />

                    <FeatureCard
                        icon={<PenLine className="h-6 w-6 text-blue-600" />}
                        title="Fast Writing"
                        desc="Create and edit notes instantly without distractions."
                    />

                    <FeatureCard
                        icon={<Sparkles className="h-6 w-6 text-blue-600" />}
                        title="Clean UI"
                        desc="Minimal design focused only on productivity."
                    />

                    <FeatureCard
                        icon={<Shield className="h-6 w-6 text-blue-600" />}
                        title="Reliable System"
                        desc="Built with modern tech stack for stability."
                    />
                </div>

            </section>

            {/* CTA */}
            <section className="bg-blue-600 text-white py-20 mt-10">

                <div className="max-w-4xl mx-auto text-center px-6">

                    <h2 className="text-3xl font-bold">
                        Start organizing your thoughts today
                    </h2>

                    <p className="mt-4 text-blue-100">
                        Join thousands of users simplifying their productivity with NotesApp.
                    </p>

                    <div className="mt-8">
                        <Link to="/signup">
                            <Button size="lg" variant="secondary">
                                Create Free Account
                            </Button>
                        </Link>
                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer id="footer" className="py-10 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} NotesApp. Built with ❤️ using React + Prisma.
            </footer>

        </div>
    );
}

/* FEATURE CARD */
function FeatureCard({
    icon,
    title,
    desc
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className="p-6 border rounded-xl bg-white hover:shadow-md transition">
            <div className="mb-3">{icon}</div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-600 text-sm mt-2">{desc}</p>
        </div>
    );
}