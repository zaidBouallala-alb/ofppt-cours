import axios from 'axios';

/**
 * Custom API Error Class
 * Standardizes error handling across the application
 */
export class ApiError extends Error {
    constructor(message, status, code, data) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
        this.data = data;
    }
}

/**
 * Axios client instance configured for the education API
 */
const apiClient = axios.create({
    baseURL: 'https://podo.b1.ma/api/public',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor
 */
apiClient.interceptors.request.use(
    (config) => {
        // Future: Add auth token here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 * Normalizes responses and standardized errors
 */
apiClient.interceptors.response.use(
    (response) => {
        // Normalize: Always return the data payload
        if (response.data && response.data.success && response.data.data !== undefined) {
            return response.data.data;
        }
        return response.data;
    },
    (error) => {
        if (axios.isCancel(error)) {
            // Re-throw cancel errors so React Query can handle them
            return Promise.reject(error);
        }

        let message = 'An unexpected error occurred';
        let status = error.response?.status || 500;
        let code = 'UNKNOWN_ERROR';
        let data = error.response?.data;

        // Extract error details from API response
        if (data?.message) {
            message = data.message;
        } else if (error.message) {
            message = error.message;
        }

        // Example: Handle specific status codes
        if (status === 401) {
            message = 'Unauthorized access';
            code = 'AUTH_ERROR';
        } else if (status === 404) {
            message = 'Resource not found';
            code = 'NOT_FOUND';
        } else if (error.code === 'ECONNABORTED') {
            message = 'Request timed out';
            code = 'TIMEOUT';
        }

        return Promise.reject(new ApiError(message, status, code, data));
    }
);

export default apiClient;
