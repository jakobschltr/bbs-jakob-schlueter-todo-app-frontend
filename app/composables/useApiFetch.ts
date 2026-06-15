export const DEFAULT_API_REQUEST_TIMEOUT_MS = 5000;

export const useApiFetch = () => {
    const { apiUrl } = useApiUrl();

    const fetchFromApi = <T>(path: string, options?: Parameters<typeof $fetch>[1]) => {
        const url = `${apiUrl.value}${path}`;
        console.log('[API] Fetch:', url);
        return $fetch<T>(url, {
            timeout: DEFAULT_API_REQUEST_TIMEOUT_MS,
            ...options,
        });
    };

    return { fetchFromApi, apiUrl };
};
