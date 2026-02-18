"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by waiting for mount if you prefer strict safety,
    // but the CSS solution below acts as a robust fix for the visual mismatch.
    // However, to be 100% safe against the "prop matching" error if next-themes
    // behaves oddly, we can strip the conditional logic entirely from the DOM attributes.

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
            className="relative w-14 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-black/10 dark:border-white/10 p-1 transition-colors duration-500 focus:outline-none overflow-hidden"
            aria-label="Toggle Theme"
        >
            {/* Icons on the track */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <Moon className="w-4 h-4 text-blue-400" />
            </div>

            {/* Elastic Knob */}
            <div
                className={`
                    absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md z-10
                    flex items-center justify-center
                    transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                    translate-x-0 dark:translate-x-6
                `}
            >
            </div>
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
