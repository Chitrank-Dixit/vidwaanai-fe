import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { searchAPI } from '../api/search';

export const useSearch = () => {
    const [query, setQuery] = useState('');

    const searchMutation = useMutation({
        mutationFn: (searchQuery: string) => searchAPI.search(searchQuery),
    });

    const suggestionsQuery = useQuery({
        queryKey: ['searchSuggestions', query],
        queryFn: () => searchAPI.getSuggestions(query),
        enabled: query.length > 2,
        staleTime: 60 * 1000, // 1 minute
    });

    return {
        search: searchMutation.mutateAsync,
        isSearching: searchMutation.isPending,
        searchResults: searchMutation.data,
        searchError: searchMutation.error,

        query,
        setQuery,
        suggestions: suggestionsQuery.data || [],
        isLoadingSuggestions: suggestionsQuery.isLoading,
    };
};
