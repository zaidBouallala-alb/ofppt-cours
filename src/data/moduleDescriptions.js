/**
 * Module Descriptions Data
 * Maps module codes/names to descriptions and topics.
 * Focus on Full Stack Development (DDOWFS, DEV)
 */

export const moduleDescriptions = {
    // First Year (Common Core)
    "M101": {
        description: "Se situer au regard du métier et de la démarche de formation.",
        topics: ["Métier de développeur", "Soft Skills", "Marché du travail"],
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
    },
    "M102": {
        description: "Acquérir les bases de l'algorithmique et de la programmation.",
        topics: ["Algorithmes", "Variables", "Boucles", "Tableaux"],
        color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
    },
    "M103": {
        description: "Maquetter une application mobile ou un site web.",
        topics: ["Figma", "UI/UX", "Wireframing", "Prototypage"],
        color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
    },
    "M104": {
        description: "Développer la partie front-end d'une application web ou d'un site web dynamique.",
        topics: ["HTML5", "CSS3", "Responsive Design", "Flexbox/Grid"],
        color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
    },
    "M105": {
        description: "Développer des sites web dynamiques avec JavaScript.",
        topics: ["DOM Manipulation", "Events", "ES6+", "Async/Await"],
        color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
    },
    "M106": {
        description: "Gérer et manipuler les bases de données relationnelles.",
        topics: ["SQL", "Merise", "Normalisation", "Requêtes complexes"],
        color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
    },
    "M107": {
        description: "Développer des sites web dynamiques coté serveur (PHP).",
        topics: ["PHP", "Sessions", "CRUD", "MVC"],
        color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
    },
    "M108": {
        description: "Gestion de projet & Méthodes Agile.",
        topics: ["Scrum", "Kanban", "Jira", "Travail d'équipe"],
        color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
    },

    // Second Year (Full Stack)
    "M201": {
        description: "Développement Front-End avancé avec React.",
        topics: ["Components", "Hooks", "State Management", "Routing"],
        color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
    },
    "M202": {
        description: "Développement Back-End avec Frameworks (Laravel).",
        topics: ["Routing", "ORM (Eloquent)", "Blade", "API Development"],
        color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
    },
    "M203": {
        description: "Développement Back-End avec Python (Django/Flask).",
        topics: ["Python", "MTV Pattern", "Django ORM", "Admin Panel"],
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
    },
    "M204": {
        description: "Déploiement et CI/CD.",
        topics: ["Docker", "Git/GitHub Actions", "Hosting", "Cloud Basics"],
        color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
    },
    "M205": {
        description: "Projet de Synthèse (PFE).",
        topics: ["Full Stack App", "Soutenance", "Documentation"],
        color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
    },
    "M206": {
        description: "Développement Mobile (Native/Cross-platform).",
        topics: ["React Native", "Flutter", "Android Studio"],
        color: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300"
    },

    // Generic / Default
    "DEFAULT": {
        description: "Module de formation professionnelle OFPPT.",
        topics: ["Compétences techniques", "Pratique"],
        color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
    }
};

/**
 * Helper to get module data safely
 * @param {string} code - The module code (e.g. "M101")
 * @returns {Object} { description, topics, color }
 */
export const getModuleDetails = (code) => {
    if (!code) return moduleDescriptions.DEFAULT;

    // Normalize code (uppercase, trim)
    const normalizedCode = code.toUpperCase().trim();

    // Direct match
    if (moduleDescriptions[normalizedCode]) {
        return moduleDescriptions[normalizedCode];
    }

    // Fuzzy match (e.g. "M101 - ..." -> matches "M101")
    const match = Object.keys(moduleDescriptions).find(key => normalizedCode.startsWith(key));

    return match ? moduleDescriptions[match] : moduleDescriptions.DEFAULT;
};
