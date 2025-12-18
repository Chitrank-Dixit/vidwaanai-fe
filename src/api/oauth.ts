import apiClient from './client';

export interface OAuthConfig {
    clientId: string;
    redirectUri: string;
    scope?: string;
    state?: string;
}

export interface OAuthTokenResponse {
    success: boolean;
    data: {
        accessToken: string;
        refreshToken?: string;
        expiresIn: number;
        user?: {
            id: string;
            email: string;
            fullName: string;
        };
    };
}

export const oauthAPI = {
    // Get authorization URL
    getAuthorizationUrl: (config: OAuthConfig): string => {
        const params = new URLSearchParams({
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            response_type: 'code',
            scope: config.scope || 'openid profile email',
            state: config.state || Math.random().toString(36).substring(7),
        });
        return `${import.meta.env.VITE_API_URL}/oauth/authorize?${params.toString()}`;
    },

    // Exchange code for token
    exchangeCode: async (
        code: string,
        codeVerifier: string,
        clientId: string
    ): Promise<OAuthTokenResponse> => {
        const response = await apiClient.post('/oauth/token', {
            grant_type: 'authorization_code',
            code,
            client_id: clientId,
            code_verifier: codeVerifier,
        });
        return response.data;
    },

    // Handle OAuth callback
    handleCallback: async (code: string, state: string): Promise<OAuthTokenResponse> => {
        const storedState = sessionStorage.getItem('oauth_state');
        if (state !== storedState) {
            throw new Error('State mismatch - possible CSRF attack');
        }

        const codeVerifier = sessionStorage.getItem('code_verifier');
        if (!codeVerifier) {
            throw new Error('Code verifier not found');
        }

        const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID || '';
        return oauthAPI.exchangeCode(code, codeVerifier, clientId);
    },
};
