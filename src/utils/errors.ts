import { AxiosError } from 'axios';

export class APIError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public details?: Record<string, any>
    ) {
        super(message);
        this.name = 'APIError';
    }
}

export const handleApiError = (error: unknown): APIError => {
    if (error instanceof AxiosError) {
        const statusCode = error.response?.status || 500;
        const message = error.response?.data?.error || error.message;
        const details = error.response?.data?.details;

        switch (statusCode) {
            case 400:
                return new APIError(400, `Bad Request: ${message}`, details);
            case 401:
                return new APIError(401, 'Unauthorized - Please login again', details);
            case 403:
                return new APIError(403, 'Forbidden - You do not have permission', details);
            case 404:
                return new APIError(404, `Not Found: ${message}`, details);
            case 409:
                return new APIError(409, `Conflict: ${message}`, details);
            case 429:
                return new APIError(429, 'Too Many Requests - Please try later', details);
            case 500:
                return new APIError(500, 'Server Error - Please try later', details);
            default:
                return new APIError(statusCode, message || 'Unknown error occurred', details);
        }
    }

    return new APIError(500, error instanceof Error ? error.message : 'Unknown error');
};

export const getUserFriendlyMessage = (error: APIError): string => {
    const messages: Record<number, string> = {
        400: 'Please check your input and try again',
        401: 'Your session has expired. Please login again.',
        403: 'You do not have permission to perform this action',
        404: 'The requested resource was not found',
        409: 'This resource already exists',
        429: 'You are making requests too quickly. Please slow down.',
        500: 'A server error occurred. Please try again later.',
    };

    return messages[error.statusCode] || error.message;
};
