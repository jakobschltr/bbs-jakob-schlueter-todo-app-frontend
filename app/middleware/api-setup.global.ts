import { hasStoredApiUrl } from '~/composables/useApiUrl';

export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.server) {
        return;
    }

    const isSetupPage = to.path === '/setup';
    const configured = hasStoredApiUrl();

    if (!configured && !isSetupPage) {
        return navigateTo('/setup');
    }

    if (configured && isSetupPage) {
        return navigateTo('/');
    }
});
