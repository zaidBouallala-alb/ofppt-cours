import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return;

        // Inject GA script if not already present
        const scriptId = "ga-script";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            document.head.appendChild(script);

            // Initialize dataLayer
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", GA_MEASUREMENT_ID, {
                page_path: window.location.pathname,
            });

            // Make gtag available globally
            window.gtag = gtag;
        }
    }, []);

    useEffect(() => {
        if (!GA_MEASUREMENT_ID || !window.gtag) return;

        // Track page view on route change
        window.gtag("config", GA_MEASUREMENT_ID, {
            page_path: location.pathname + location.search,
        });
    }, [location]);

    return null;
};

export default GoogleAnalytics;
