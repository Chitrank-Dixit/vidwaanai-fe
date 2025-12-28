import apiClient from './client';

export interface Entity {
    name: string;
    type: string;
    description?: string;
    confidence?: number;
}

export interface Source {
    title: string;
    ref: string;
    url?: string;
    snippet?: string;
}

export interface SearchResult {
    query: string;
    results: {
        text: string;
        entities: Entity[];
        sources: Source[];
    };
}

export const searchAPI = {
    // Perform a search query
    search: async (query: string): Promise<SearchResult> => {
        // TODO: Replace with actual endpoint when backend is ready
        // Currently assuming a generic /api/search endpoint
        const response = await apiClient.post('/api/search', { query });
        return response.data;
    },

    // Get suggestions for autocomplete
    getSuggestions: async (partialQuery: string): Promise<string[]> => {
        const response = await apiClient.get('/api/search/suggestions', {
            params: { q: partialQuery }
        });
        return response.data;
    }
};
