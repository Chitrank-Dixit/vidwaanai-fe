export const UserRole = {
    USER: 'user',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    emailVerified: boolean;
    status: 'active' | 'inactive' | 'suspended';
    preferences?: {
        theme?: 'light' | 'dark';
        language?: string;
        notifications?: boolean;
    };
    createdAt: string;
    lastLogin?: string;
    permissions?: string[];
}

export interface AuthToken {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
}

export interface ApiError {
    success: false;
    error: string;
    statusCode?: number;
    details?: Record<string, any>;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}
