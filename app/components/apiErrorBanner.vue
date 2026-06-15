<template>
    <ClientOnly>
        <div
            v-if="apiConnectionError"
            class="mx-4 mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
            role="alert"
        >
            <p>{{ API_CONNECTION_ERROR_MESSAGE }}</p>
            <p class="mt-2 text-red-600/90 dark:text-red-300/90">
                Läuft die API lokal? Prüfe, ob dein Browser der Webseite den Zugriff auf Geräte im lokalen Netzwerk erlaubt.
            </p>
            <NuxtLink
                to="/settings"
                class="mt-2 inline-block font-medium underline underline-offset-2"
            >
                Zu den Einstellungen
            </NuxtLink>
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
const apiConnectionError = useState('api-connection-error', () => false);
</script>
