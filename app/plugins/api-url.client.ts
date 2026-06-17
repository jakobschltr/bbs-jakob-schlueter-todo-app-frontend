import { API_URL_CONFIGURED_STATE_KEY, API_URL_STATE_KEY, API_URL_STORAGE_KEY } from '~/composables/useApiUrl';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const defaultApiUrl = config.public.apiUrl as string;
    const apiUrl = useState<string>(API_URL_STATE_KEY, () => defaultApiUrl);
    const isApiUrlConfigured = useState(API_URL_CONFIGURED_STATE_KEY, () => false);

    try {
        const stored = localStorage.getItem(API_URL_STORAGE_KEY);
        if (stored) {
            apiUrl.value = stored.trim().replace(/\/+$/, '') || defaultApiUrl;
            isApiUrlConfigured.value = true;
        }
    } catch {
        apiUrl.value = defaultApiUrl;
        isApiUrlConfigured.value = false;
    }
});
