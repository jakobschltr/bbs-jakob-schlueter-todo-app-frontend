export const DEFAULT_API_URL = 'http://192.168.24.114:5000';
export const API_URL_STORAGE_KEY = 'todo-api-url';

const normalizeApiUrl = (url: string) => url.trim().replace(/\/+$/, '');

export const useApiUrl = () => {
    const apiUrl = useState('todo-api-url', () => DEFAULT_API_URL);
    const { clearApiConnectionError } = useApiError();

    const setApiUrl = (url: string) => {
        const normalized = normalizeApiUrl(url) || DEFAULT_API_URL;
        apiUrl.value = normalized;
        if (import.meta.client) {
            localStorage.setItem(API_URL_STORAGE_KEY, normalized);
        }
        clearApiConnectionError();
    };

    const resetApiUrl = () => setApiUrl(DEFAULT_API_URL);

    return {
        apiUrl,
        setApiUrl,
        resetApiUrl,
        defaultApiUrl: DEFAULT_API_URL,
    };
};
