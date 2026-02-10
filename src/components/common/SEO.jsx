import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Enhanced SEO Component
 * Manages Head elements including Open Graph and Twitter Cards
 */
export default function SEO({
    title,
    description,
    keywords,
    image,
    type = 'website'
}) {
    const location = useLocation();
    const currentUrl = window.location.origin + location.pathname;
    const siteName = "OFPPT Cours";
    const defaultImage = "https://ofppt-cours.com/og-image.jpg"; // Replace with actual default image URL

    useEffect(() => {
        // 1. Update Title
        const fullTitle = title ? `${title} | ${siteName}` : siteName;
        document.title = fullTitle;

        // 2. Helper to set/update meta tags
        const setMeta = (selector, content) => {
            if (content === undefined || content === null) return;

            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                // Handle different attribute names (name vs property)
                if (selector.startsWith('meta[property')) {
                    element.setAttribute('property', selector.match(/property="([^"]*)"/)[1]);
                } else {
                    element.setAttribute('name', selector.match(/name="([^"]*)"/)[1]);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // 3. Standard Meta
        setMeta('meta[name="description"]', description);
        setMeta('meta[name="keywords"]', keywords);
        setMeta('meta[name="robots"]', 'index, follow');

        // 4. Open Graph (Facebook, LinkedIn)
        setMeta('meta[property="og:site_name"]', siteName);
        setMeta('meta[property="og:title"]', title || siteName);
        setMeta('meta[property="og:description"]', description);
        setMeta('meta[property="og:type"]', type);
        setMeta('meta[property="og:url"]', currentUrl);
        setMeta('meta[property="og:image"]', image || defaultImage);

        // 5. Twitter Card
        setMeta('meta[name="twitter:card"]', 'summary_large_image');
        setMeta('meta[name="twitter:title"]', title || siteName);
        setMeta('meta[name="twitter:description"]', description);
        setMeta('meta[name="twitter:image"]', image || defaultImage);

    }, [title, description, keywords, image, type, currentUrl]);

    return null;
}

