import { hasStoredApiUrl } from '~/composables/useApiUrl';

export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.server) {
        return;
    }

    const { isApiUrlConfigured } = useApiUrl();
    const isSetupPage = to.path === '/setup';
    const configured = hasStoredApiUrl() || isApiUrlConfigured.value;

    if (!configured && !isSetupPage) {
        return navigateTo('/setup');
    }

    if (configured && isSetupPage) {
        return navigateTo('/');
    }
});
