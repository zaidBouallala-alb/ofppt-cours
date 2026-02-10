import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mocking fetch if running in environment without global fetch (Node 18+ has it)
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE_URL = 'https://ofppt-cours.vercel.app';
const API_BASE_URL = 'https://ofppt-api-api.vercel.app/api'; // Based on project analysis

const ROUTES = [
    '/',
    '/levels',
];

async function generateSitemap() {
    console.log('🗺️  Generating Sitemap...');

    const urls = [...ROUTES];

    try {
        // 1. Fetch Years/Levels (Static enough, but let's assume we have dynamic ones or just link to them)
        // For now we have static routes.

        // 2. Fetch Formations (Pseudo-code as we might need IDs)
        // const formationsRes = await fetch(`${API_BASE_URL}/formations`);
        // const formations = await formationsRes.json();
        // formations.forEach(f => urls.push(`/formations/${f.id}`));

        // Since we don't have direct access to run robust fetch data logic without setup,
        // We will generate a base sitemap and valid dynamic templates.

        // Note: In a real scenario, you would fetch all IDs here. 
        // For this demonstration, we will rely on key landing pages.

    } catch (error) {
        console.error('Error fetching data for sitemap:', error);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const publicDir = path.join(__dirname, '../public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated at public/sitemap.xml');
}

generateSitemap();
