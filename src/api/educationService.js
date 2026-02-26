import apiClient from './client';

/**
 * @typedef {Object} RequestOptions
 * @property {AbortSignal} [signal] - AbortSignal for cancellation
 */

/**
 * Education API Service
 * All API calls for the education system
 */
const educationService = {
    /**
     * Get all education years
     * @param {RequestOptions} [options]
     * @returns {Promise<Array>} Array of year objects
     */
    getYears: async (options = {}) => {
        return await apiClient.get('/years', { signal: options.signal });
    },

    /**
     * Get formations (filières) for a specific year
     * @param {number} yearId - The ID of the education year
     * @param {RequestOptions} [options]
     * @returns {Promise<Array>} Array of formation objects
     */
    getFormations: async (yearId, options = {}) => {
        if (!yearId) throw new Error('Year ID is required');
        return await apiClient.get(`/years/${yearId}/filieres`, { signal: options.signal });
    },

    /**
     * Get modules for a specific formation
     * @param {number} formationId - The ID of the formation
     * @param {RequestOptions} [options]
     * @returns {Promise<Array>} Array of module objects
     */
    getModules: async (formationId, options = {}) => {
        if (!formationId) throw new Error('Formation ID is required');
        return await apiClient.get(`/filieres/${formationId}/modules`, { signal: options.signal });
    },

    /**
     * Get courses for a specific module
     * @param {number} moduleId - The ID of the module
     * @param {RequestOptions} [options]
     * @returns {Promise<Array>} Array of course objects
     */
    getCourses: async (moduleId, options = {}) => {
        if (!moduleId) throw new Error('Module ID is required');
        return await apiClient.get(`/modules/${moduleId}/courses`, { signal: options.signal });
    },

    /**
     * Get exams (EFM exams and controls) for a specific course
     * @param {number} courseId - The ID of the course
     * @param {RequestOptions} [options]
     * @returns {Promise<Object>} Exams object
     */
    getExams: async (courseId, options = {}) => {
        if (!courseId) throw new Error('Course ID is required');
        return await apiClient.get(`/courses/${courseId}/exams`, { signal: options.signal });
    },

    /**
     * Get EFMs for a specific module
     * @param {number} moduleId - The ID of the module
     * @param {RequestOptions} [options]
     * @returns {Promise<Array>} Array of EFM objects
     */
    getEfms: async (moduleId, options = {}) => {
        if (!moduleId) throw new Error('Module ID is required');
        return await apiClient.get(`/modules/${moduleId}/efms`, { signal: options.signal });
    },

    /**
     * Get Controls for a specific module
     * @param {number} moduleId - The ID of the module
     * @param {RequestOptions} [options]
     * @returns {Promise<Array>} Array of Control objects
     */
    getControls: async (moduleId, options = {}) => {
        if (!moduleId) throw new Error('Module ID is required');
        return await apiClient.get(`/modules/${moduleId}/ccs`, { signal: options.signal });
    },

    /**
     * Get EFFs (Examen de Fin de Formation) for a specific formation
     * @param {number} formationId - The ID of the formation
     * @param {RequestOptions} [options]
     * @returns {Promise<Array>} Array of EFF objects
     */
    getEffs: async (formationId, options = {}) => {
        if (!formationId) throw new Error('Formation ID is required');
        return await apiClient.get(`/filieres/${formationId}/effs`, { signal: options.signal });
    },

    /**
     * Helper function to download a file (works cross-origin)
     * Uses fetch + blob for cross-origin URLs to force download
     * Falls back to window.open if fetch fails (e.g. CORS blocked)
     * @param {string} url - The URL of the file to download
     * @param {string} filename - The filename to save as
     */
    downloadFile: async (url, filename) => {
        if (!url) return;

        const name = filename || 'download.pdf';

        try {
            // Try fetch + blob approach (works for most servers)
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = name;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
            }, 100);
        } catch {
            // Fallback: open in new tab (e.g. if CORS blocks fetch)
            window.open(url, '_blank');
        }
    }
};

// Backward compatibility alias and named exports
export const {
    getYears,
    getFormations,
    getModules,
    getCourses,
    getExams,
    getEfms,
    getControls,
    getEffs,
    downloadFile
} = educationService;

export const getResources = getExams;

export default educationService;
