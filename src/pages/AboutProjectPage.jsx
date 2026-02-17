import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function AboutProjectPage() {
    return (
        <div className="relative min-h-screen w-full bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
            <SEO
                title="About This Project - Technical Showcase"
                description="Technical overview of the OFPPT Cours platform: Architecture, Performance, and Tech Stack."
            />
            <ThemeToggle />

            <main className="max-w-4xl mx-auto px-6 py-20 animate-fade-in">

                {/* Header */}
                <header className="mb-16 text-center">
                    <div className="badge mb-4 bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 border border-sky-200 dark:border-sky-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Technical Case Study
                    </div>
                    <h1 className="heading-xl mb-6">
                        About This Project
                    </h1>
                    <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
                        A deep dive into the architecture, design choices, and performance optimizations behind the OFPPT Cours platform.
                    </p>
                </header>

                {/* Tech Stack Grid */}
                <section className="mb-20">
                    <h2 className="heading-lg mb-8 border-b border-[var(--border-card)] pb-4">Tech Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "React 18", desc: "Core UI Library" },
                            { name: "Vite", desc: "Build Tool" },
                            { name: "Tailwind CSS", desc: "Utility-first Styling" },
                            { name: "React Router v7", desc: "Data Routing" },
                            { name: "TanStack Query", desc: "Async State Management" },
                            { name: "Sentry", desc: "Error Tracking" },
                            { name: "PWA", desc: "Offline Capabilities" },
                            { name: "Vercel", desc: "Deployment" },
                        ].map((tech) => (
                            <div key={tech.name} className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-card)] hover:border-[var(--color-accent)] transition-all hover:-translate-y-1">
                                <h3 className="font-bold mb-1">{tech.name}</h3>
                                <p className="text-xs text-[var(--text-muted)]">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Architecture Section */}
                <section className="mb-20 space-y-8">
                    <h2 className="heading-lg mb-8 border-b border-[var(--border-card)] pb-4">Architecture & Data Flow</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="prose dark:prose-invert">
                            <h3 className="heading-md mb-4 text-[var(--color-accent)]">Render-as-You-Fetch</h3>
                            <p className="text-[var(--text-muted)] mb-4">
                                We moved away from the traditional <em>Fetch-on-Render</em> pattern (useEffect) to <em>Render-as-You-Fetch</em>.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-[var(--text-muted)]">
                                <li><strong>Router Loaders:</strong> Data fetching starts immediately when the user clicks a link, in parallel with code loading.</li>
                                <li><strong>No Waterfalls:</strong> Nested routes fetch their data simultaneously, eliminating request chains.</li>
                                <li><strong>Suspense:</strong> React's Suspense handles loading states declaratively.</li>
                            </ul>
                        </div>
                        <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-card)] flex items-center justify-center font-mono text-xs text-[var(--text-muted)]">
                            <div className="w-full space-y-4">
                                <div className="flex justify-between items-center p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <span>Link Click</span>
                                    <span> Start Fetching & Loading Code</span>
                                </div>
                                <div className="flex justify-between items-center p-2 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                    <span>Navigation</span>
                                    <span> Render Suspense Fallback</span>
                                </div>
                                <div className="flex justify-between items-center p-2 rounded bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                    <span>Data Ready</span>
                                    <span> Render UI Component</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Performance Section */}
                <section className="mb-20">
                    <h2 className="heading-lg mb-8 border-b border-[var(--border-card)] pb-4">Performance Optimizations</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-card)]">
                            <h3 className="heading-md mb-4">Code Splitting</h3>
                            <p className="text-sm text-[var(--text-muted)]">
                                Route-based chunking ensures users only download the JavaScript needed for the current page. Secondary chunks are lazy-loaded.
                            </p>
                        </div>
                        <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-card)]">
                            <h3 className="heading-md mb-4">Asset Optimization</h3>
                            <p className="text-sm text-[var(--text-muted)]">
                                Images use explicit dimensions to prevent CLS. Fonts are loaded with <code>display: swap</code> to minimize FOUT (Flash of Unstyled Text).
                            </p>
                        </div>
                        <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-card)]">
                            <h3 className="heading-md mb-4">PWA & Caching</h3>
                            <p className="text-sm text-[var(--text-muted)]">
                                Service Workers cache critical assets and API responses, enabling instant loads on repeat visits and full offline functionality.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Challenges Section */}
                <section className="mb-20">
                    <h2 className="heading-lg mb-8 border-b border-[var(--border-card)] pb-4">Challenges & Solutions</h2>
                    <div className="space-y-6">
                        <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-card)]">
                            <h3 className="font-bold flex items-center gap-2 mb-2">
                                Challenge: API Request Waterfalls
                            </h3>
                            <p className="text-sm text-[var(--text-muted)] pl-7">
                                <strong>Solution:</strong> Leveraged React Router v7 <code>loaders</code> to hoist data requirements to the route definition level, allowing parallel fetching.
                            </p>
                        </div>
                        <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-card)]">
                            <h3 className="font-bold flex items-center gap-2 mb-2">
                                Challenge: Search Performance
                            </h3>
                            <p className="text-sm text-[var(--text-muted)] pl-7">
                                <strong>Solution:</strong> Implemented client-side filtering with a custom <code>useSearch</code> hook that performs accent-insensitive and fuzzy matching without causing re-renders on every keystroke.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full hover:opacity-90 transition-all font-medium">
                        Explore the Application
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>

            </main>
        </div>
    );
}
