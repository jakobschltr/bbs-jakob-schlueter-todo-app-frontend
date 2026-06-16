export const API_URL_STATE_KEY = 'todo-api-url';
export const API_URL_STORAGE_KEY = 'todo-api-url';
export const API_URL_CONFIGURED_STATE_KEY = 'todo-api-url-configured';

const normalizeApiUrl = (url: string) => url.trim().replace(/\/+$/, '');

export const hasStoredApiUrl = () => {
    if (!import.meta.client) {
        return false;
    }
    try {
        return Boolean(localStorage.getItem(API_URL_STORAGE_KEY));
    } catch {
        return false;
    }
};

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
    const isApiUrlConfigured = useState(API_URL_CONFIGURED_STATE_KEY, () => false);

    const setApiUrl = (url: string) => {
        const normalized = normalizeApiUrl(url) || defaultApiUrl;
        apiUrl.value = normalized;
        isApiUrlConfigured.value = true;
        if (import.meta.client) {
            try {
                localStorage.setItem(API_URL_STORAGE_KEY, normalized);
            } catch {
                // Storage may be blocked or full — URL still applies for this session.
            }
        }
    };

    const resetApiUrl = () => setApiUrl(defaultApiUrl);

    return {
        apiUrl,
        isApiUrlConfigured,
        setApiUrl,
        resetApiUrl,
        defaultApiUrl,
        refreshApiQueries,
    };
};
