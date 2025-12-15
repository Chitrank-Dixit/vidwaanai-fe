export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
