import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/color-mode',
        '@nuxt/icon',
        '@nuxt/fonts',
        '@pinia/nuxt',
        '@pinia/colada-nuxt',
        '@nuxt/eslint',
    ],
    css: ['~/assets/css/tailwind.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
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
});
