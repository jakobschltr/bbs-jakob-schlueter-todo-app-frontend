export const DEFAULT_API_REQUEST_TIMEOUT_MS = 5000;

const joinApiUrl = (base: string, path: string) =>
    new URL(path.startsWith('/') ? path : `/${path}`, base.endsWith('/') ? base : `${base}/`).href;

export const useApiFetch = () => {
    const { apiUrl } = useApiUrl();

    const fetchFromApi = <T>(path: string, options?: Parameters<typeof $fetch>[1]) => {
        const url = joinApiUrl(apiUrl.value, path);
        return $fetch<T>(url, {
            timeout: DEFAULT_API_REQUEST_TIMEOUT_MS,
            ...options,
        });
    };

    return { fetchFromApi, apiUrl };
};

export const verifyApiConnection = async (): Promise<boolean> => {
    const { fetchFromApi } = useApiFetch();
    const { setApiConnectionError, clearApiConnectionError } = useApiError();

    try {
        await fetchFromApi('/todo-list');
        clearApiConnectionError();
        return true;
    } catch (error) {
        setApiConnectionError(error);
        return false;
    }
};
