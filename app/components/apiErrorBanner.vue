<template>
    <div
        v-if="apiConnectionError"
        class="pt-3 sm:pt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
        role="alert"
    >
        <p>{{ API_CONNECTION_ERROR_MESSAGE }}</p>
        <p class="mt-2 text-red-600/90 dark:text-red-300/90">
            Läuft dein Backend auf einem Gerät im Heimnetzwerk (Raspberry Pi, Linux-Server, lokale IP)?
            Erlaube in der Chrome-Abfrage den Zugriff auf andere Geräte im Netzwerk („Zulassen“ wählen).
        </p>
        <NuxtLink
            v-if="!isSettingsPage"
            to="/settings"
            class="mt-2 inline-block font-medium underline underline-offset-2"
        >
            Zu den Einstellungen
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const apiConnectionError = useState('api-connection-error', () => false);
const isSettingsPage = computed(() => route.path === '/settings');
</script>
