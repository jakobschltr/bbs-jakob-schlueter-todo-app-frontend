export const API_URL_STATE_KEY = 'todo-api-url';
export const API_URL_STORAGE_KEY = 'todo-api-url';

const normalizeApiUrl = (url: string) => url.trim().replace(/\/+$/, '');

const refreshApiQueries = async () => {
    if (!import.meta.client) {
        return;
    }
    await nextTick();
    const queryCache = useQueryCache();
    await queryCache.invalidateQueries({ key: ['todolists'] });
    await queryCache.invalidateQueries({ key: ['todos'] });
};

export const useApiUrl = () => {
    const config = useRuntimeConfig();
    const defaultApiUrl = config.public.apiUrl as string;
    const apiUrl = useState(API_URL_STATE_KEY, () => defaultApiUrl);

    const setApiUrl = (url: string) => {
        const normalized = normalizeApiUrl(url) || defaultApiUrl;
        apiUrl.value = normalized;
        if (import.meta.client) {
            localStorage.setItem(API_URL_STORAGE_KEY, normalized);
        }
    };

    const resetApiUrl = () => setApiUrl(defaultApiUrl);

    return {
        apiUrl,
        setApiUrl,
        resetApiUrl,
        defaultApiUrl,
        refreshApiQueries,
    };
};
