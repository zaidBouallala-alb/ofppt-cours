import React from "react";

/**
 * LevelCard Configuration System
 * Maps abstract color names to concrete Tailwind classes for all component parts.
 * Ensures consistent theming and valid Tailwind class extraction.
 */
const COLOR_THEMES = {
    blue: {
        accentInfo: "bg-blue-500",
        accentRest: "bg-blue-200 dark:bg-blue-900",
        categoryText: "text-blue-600 dark:text-blue-400",
        hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
        iconUser: "text-blue-600 dark:text-blue-400",
        iconBg: "group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30"
    },
    violet: {
        accentInfo: "bg-violet-500",
        accentRest: "bg-violet-200 dark:bg-violet-900",
        categoryText: "text-violet-600 dark:text-violet-400",
        hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
        iconUser: "text-violet-600 dark:text-violet-400",
        iconBg: "group-hover:bg-violet-50 dark:group-hover:bg-violet-900/30"
    },
    amber: {
        accentInfo: "bg-amber-500",
        accentRest: "bg-amber-200 dark:bg-amber-900",
        categoryText: "text-amber-600 dark:text-amber-400",
        hoverBorder: "hover:border-amber-300 dark:hover:border-amber-700",
        iconUser: "text-amber-600 dark:text-amber-400",
        iconBg: "group-hover:bg-amber-50 dark:group-hover:bg-amber-900/30"
    },
    slate: {
        accentInfo: "bg-slate-500",
        accentRest: "bg-slate-200 dark:bg-slate-700",
        categoryText: "text-slate-600 dark:text-slate-400",
        hoverBorder: "hover:border-slate-300 dark:hover:border-slate-600",
        iconUser: "text-slate-500 dark:text-slate-400",
        iconBg: "group-hover:bg-slate-100 dark:group-hover:bg-slate-800"
    }
};

/**
 * LevelCard — Smart component with theme-aware coloring.
 * now accepts a simple `color` prop to derive all styles.
 */
export default function LevelCard({
    categoryLabel,
    title,
    description,
    color = "slate", // blue, violet, amber, slate
    onClick,
    animationDelay = 0,
}) {
    // Get theme classes, fallback to slate if invalid color provided
    const theme = COLOR_THEMES[color] || COLOR_THEMES.slate;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
        group relative w-full flex items-center gap-5
        py-5 pl-7 pr-5 rounded-2xl text-left cursor-pointer
        overflow-hidden

        /* Surface */
        bg-[var(--bg-card)]
        border border-[var(--border-card)]
        ${theme.hoverBorder}

        /* Shadow */
        shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)]
        dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)]

        /* Transitions */
        transition-all duration-200 ease-out

        /* Hover */
        hover:bg-[var(--bg-card-hover)]
        hover:-translate-y-0.5
        hover:shadow-md
        
        /* A11y */
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-blue-500
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]

        active:scale-[0.995]
        animate-slide-up
      `}
            style={{ animationDelay: `${animationDelay}s` }}
        >
            {/* ── Accent Bar ── */}
            {/* Resting state: Solid muted color (no opacity) */}
            <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full 
                    ${theme.accentRest} 
                    group-hover:opacity-0 transition-opacity duration-200`}
                aria-hidden="true"
            />
            {/* Hover state: Vibrant color overlays the muted one */}
            <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full 
                    ${theme.accentInfo} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                aria-hidden="true"
            />

            {/* ── Content ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-1">
                <span
                    className={`text-xs font-bold uppercase tracking-widest leading-none ${theme.categoryText}`}
                >
                    {categoryLabel}
                </span>

                <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]
                       group-hover:text-[var(--text-primary)]
                       transition-colors duration-200 truncate">
                    {title}
                </h3>

                {description && (
                    <p className="text-sm text-[var(--text-muted)] leading-snug mt-0.5">
                        {description}
                    </p>
                )}
            </div>

            {/* ── Chevron ── */}
            <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center
                      rounded-xl bg-slate-100/80 dark:bg-slate-800
                      text-slate-400 dark:text-slate-500
                      ${theme.iconBg}
                      group-hover:${theme.iconUser}
                      transition-all duration-200`}>
                <svg
                    className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </button>
    );
}
