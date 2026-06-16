import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/color-mode',
        '@nuxt/fonts',
        '@pinia/nuxt',
        '@pinia/colada-nuxt',
        '@nuxt/eslint',
        '@nuxt/icon',
    ],
    css: ['~/assets/css/tailwind.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ],
        },
        ssr: {
            noExternal: ['vue'],
        },
    },
    colorMode: {
        preference: 'system',
        classPrefix: '',
        classSuffix: '',
        storage: 'localStorage',
    },
    runtimeConfig: {
        public: {
            apiUrl: 'http://localhost:5000',
        },
    },
    icon: {
        mode: 'svg',
        serverBundle: {
            collections: ['heroicons-solid'],
        },
    },
});
