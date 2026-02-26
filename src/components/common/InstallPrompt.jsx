import React, { useEffect, useState } from 'react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('installPromptDismissed')) return;

        const handler = (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = () => {
        setIsVisible(false);
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
                sessionStorage.setItem('installPromptDismissed', 'true');
            }
            setDeferredPrompt(null);
        });
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-fade-in flex items-center gap-3 px-4 py-3 bg-[var(--color-accent)] text-white rounded-lg shadow-lg">
            <button
                onClick={handleInstallClick}
                className="flex items-center gap-3 hover:opacity-90 transition-all hover:scale-105 focus:outline-none"
            >
                <div className="p-2 bg-white/20 rounded-md">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </div>
                <div className="text-left">
                    <p className="text-xs font-medium opacity-90">Install App</p>
                    <p className="text-sm font-bold">OFPPT Cours</p>
                </div>
            </button>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                    sessionStorage.setItem('installPromptDismissed', 'true');
                }}
                className="ml-2 p-1.5 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
                aria-label="Dismiss install prompt"
            >
                <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
