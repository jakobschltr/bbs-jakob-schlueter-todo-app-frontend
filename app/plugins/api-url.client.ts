import { API_URL_STATE_KEY, API_URL_STORAGE_KEY } from '~/composables/useApiUrl';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const defaultApiUrl = config.public.apiUrl as string;
    const apiUrl = useState<string>(API_URL_STATE_KEY, () => defaultApiUrl);

    try {
        const stored = localStorage.getItem(API_URL_STORAGE_KEY);
        if (stored) {
            apiUrl.value = stored.trim().replace(/\/+$/, '') || defaultApiUrl;
        }
    } catch {
        apiUrl.value = defaultApiUrl;
    }
});
