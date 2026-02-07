import apiClient from './client';

/**
 * Education API Service
 * All API calls for the education system
 */

/**
 * Get all education years
 * @returns {Promise<Array>} Array of year objects
 */
export const getYears = async () => {
    try {
        const data = await apiClient.get('/years');
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get formations (filières) for a specific year
 * @param {number} yearId - The ID of the education year
 * @returns {Promise<Array>} Array of formation objects
 */
export const getFormations = async (yearId) => {
    if (!yearId) {
        throw new Error('Year ID is required');
    }

    try {
        const data = await apiClient.get(`/years/${yearId}/filieres`);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get modules for a specific formation
 * @param {number} formationId - The ID of the formation (filière)
 * @returns {Promise<Array>} Array of module objects
 */
export const getModules = async (formationId) => {
    if (!formationId) {
        throw new Error('Formation ID is required');
    }

    try {
        const data = await apiClient.get(`/filieres/${formationId}/modules`);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get courses for a specific module
 * @param {number} moduleId - The ID of the module
 * @returns {Promise<Array>} Array of course objects
 */
export const getCourses = async (moduleId) => {
    if (!moduleId) {
        throw new Error('Module ID is required');
    }

    try {
        const data = await apiClient.get(`/modules/${moduleId}/courses`);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get exams (EFM exams and controls) for a specific course
 * @param {number} courseId - The ID of the course
 * @returns {Promise<Object>} Exams object with EFM and controls
 */
// ... existing getExams ...
export const getExams = async (courseId) => {
    if (!courseId) {
        throw new Error('Course ID is required');
    }

    try {
        const data = await apiClient.get(`/courses/${courseId}/exams`);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get EFMs for a specific module
 * @param {number} moduleId - The ID of the module
 * @returns {Promise<Array>} Array of EFM objects
 */
export const getEfms = async (moduleId) => {
    if (!moduleId) {
        throw new Error('Module ID is required');
    }

    try {
        const data = await apiClient.get(`/modules/${moduleId}/efms`);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get Controls for a specific module
 * @param {number} moduleId - The ID of the module
 * @returns {Promise<Array>} Array of Control objects
 */
export const getControls = async (moduleId) => {
    if (!moduleId) {
        throw new Error('Module ID is required');
    }

    try {
        const data = await apiClient.get(`/modules/${moduleId}/ccs`);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get EFFs (Examen de Fin de Formation) for a specific formation
 * @param {number} formationId - The ID of the formation (filière)
 * @returns {Promise<Array>} Array of EFF objects
 */
export const getEffs = async (formationId) => {
    if (!formationId) {
        throw new Error('Formation ID is required');
    }

    try {
        const data = await apiClient.get(`/filieres/${formationId}/effs`);
        return data;
    } catch (error) {
        throw error;
    }
};

// Backward compatibility alias
export const getResources = getExams;

/**
 * Helper function to download a file
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The filename to save as
 */
export const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default {
    getYears,
    getFormations,
    getModules,
    getCourses,
    getExams,
    getEfms,
    getEffs,
    getControls,
    getResources, // Backward compatibility
    downloadFile,
};
