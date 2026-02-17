import React from "react";

/**
 * BrandLogo — A smart logo component that adapts to light/dark modes.
 *
 * Logic:
 * - Light Mode: Renders the original `logo.png` (black).
 * - Dark Mode: Applies `brightness-0 invert` filter.
 *   - `brightness(0)` turns the image solid black.
 *   - `invert(1)` turns the solid black into solid white.
 *   This ensures a crisp, monochrome white logo in dark mode,
 *   regardless of the original logo's colors.
 *
 * @param {string} className - Optional additional classes
 * @param {number} size - Size in pixels (width/height)
 */
export default function BrandLogo({ className = "", size = 64 }) {
    return (
        <img
            src="/logo.png"
            alt="OFPPT Logo"
            width={size}
            height={size}
            className={`
                object-contain 
                transition-[filter] duration-300
                dark:brightness-0 dark:invert
                ${className}
            `}
        />
    );
}
