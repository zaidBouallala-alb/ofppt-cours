import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";
import SEO from "../components/common/SEO";

export default function EducateWelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full transition-colors duration-300">
      <SEO
        title="Welcome - OFPPT Cours"
        description="The #1 platform for OFPPT students. Access free courses, EFF exams, and summaries for Technicien Spécialisé, DD, and ID."
        keywords="ofppt, cours, exams, eff, technicien spécialisé, developpement digital, morocco"
      />
      <ThemeToggle />

      <main className="page-container flex flex-col items-center">

        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center min-h-[85vh] text-center max-w-4xl mx-auto px-6 animate-fade-in">

          <div className="badge mb-8 bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border-card)] px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent)] mr-2"></span>
            Free Educational Resources
          </div>

          <h1 className="heading-xl mb-8 text-balance text-[var(--text-primary)]">
            Master your <span className="text-[var(--color-accent)]">OFPPT Formation</span>
          </h1>

          <p className="text-body text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light text-balance text-[var(--text-muted)]">
            The ultimate open-source platform for Moroccan trainees. Access high-quality summaries, regional exams, and end-of-year projects (EFF) for free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button
              onClick={() => navigate("/levels")}
              className="w-full sm:w-auto px-10 py-4 bg-[var(--color-accent)] text-white font-medium rounded-full hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-[var(--color-accent)]/20"
            >
              Start Learning
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </section>

        {/* EXPANDED CONTENT SECTION */}
        <section className="section-container w-full max-w-7xl mx-auto px-6 py-20">
          <div className="prose dark:prose-invert max-w-none text-[var(--text-muted)]">

            {/* Introduction: What is OFPPT Cours? */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="badge mb-4 inline-block px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--color-accent)] font-semibold text-sm">About the Platform</span>
              <h2 className="heading-lg mb-6 text-[var(--text-primary)]">
                Morocco's Leading Open-Source Learning Hub
              </h2>
              <p className="text-body text-lg">
                <strong>OFPPT Cours</strong> is a community-driven educational platform dedicated to democratizing access to quality resources for trainees across the
                <em> Office de la Formation Professionnelle et de la Promotion du Travail</em> (OFPPT) network.
                We believe that knowledge should be free, accessible, and up-to-date.
              </p>
            </div>

            {/* Grid: Who & Resources */}
            <div className="grid md:grid-cols-2 gap-12 text-left mb-16">
              {/* Column 1: Who it is for */}
              <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-card)]">
                <div className="icon-box icon-box-md bg-[var(--bg-page)] text-[var(--color-accent)] mb-6 p-3 rounded-lg w-fit">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="heading-md mb-4 text-[var(--text-primary)]">Tailored for Future Technicians</h3>
                <p className="text-body mb-4">
                  Our content is specifically curated for students pursuing diplomas in:
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <strong>Technicien Spécialisé (TS)</strong>: Digital Dev, Infrastructure, AI.
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <strong>Technicien (T)</strong>: Accounting, Electricity, Mechanics.
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <strong>Qualification (Q)</strong>: Practical trades and vocational skills.
                  </li>
                </ul>
              </div>

              {/* Column 2: What resources */}
              <div className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-card)]">
                <div className="icon-box icon-box-md bg-[var(--bg-page)] text-rose-500 mb-6 p-3 rounded-lg w-fit">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="heading-md mb-4 text-[var(--text-primary)]">A Complete Academic Library</h3>
                <p className="text-body mb-4">
                  Everything you need to succeed, organized by year and module:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span><strong>Module Summaries</strong>: Concise, high-impact PDF guides for quick revision.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span><strong>Exams (EFF)</strong>: A vast archive of Regional and National end-of-year exams with detailed corrections.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    <span><strong>Practical Exercises</strong>: Hands-on code labs and business case studies.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-[var(--text-muted)] mb-6">
                Join thousands of Moroccan students who trust us for their exam preparation.
              </p>
              <button
                onClick={() => window.open('https://github.com/zaidBouallala-alb/zaidBouallala-alb', '_blank')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border-card)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Contribute on GitHub
              </button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
