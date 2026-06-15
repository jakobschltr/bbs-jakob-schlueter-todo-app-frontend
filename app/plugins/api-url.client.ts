import { API_URL_STORAGE_KEY, DEFAULT_API_URL } from '~/composables/useApiUrl';

export default defineNuxtPlugin(() => {
    const apiUrl = useState<string>('todo-api-url', () => DEFAULT_API_URL);
    const stored = localStorage.getItem(API_URL_STORAGE_KEY);

    if (stored) {
        apiUrl.value = stored.trim().replace(/\/+$/, '') || DEFAULT_API_URL;
    }

    console.log('[API] Base URL:', apiUrl.value);
});
