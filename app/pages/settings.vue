<template>
    <div class="flex justify-center">
        <div class="w-full max-w-2xl">
            <div class="mb-4">
                <span class="text-text-variant text-sm">
                    Einstellungen
                </span>
            </div>

            <h2 class="text-lg font-bold mb-2">
                API-Verbindung
            </h2>
            <p class="text-text-variant text-sm mb-4">
                Passe die Basis-URL an, wenn dein Backend unter einer anderen Adresse erreichbar ist.
            </p>

            <div
                class="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200"
                role="note"
            >
                <p class="font-medium mb-1">
                    Zugriff auf lokale Geräte
                </p>
                <p class="text-amber-800/90 dark:text-amber-200/90">
                    Läuft deine API auf
                    <code class="rounded bg-amber-500/15 px-1">localhost</code>
                    oder einer lokalen IP (z. B.
                    <code class="rounded bg-amber-500/15 px-1">192.168.x.x</code>),
                    muss der Browser der Webseite unter Umständen den Zugriff auf Geräte im lokalen Netzwerk erlauben.
                    Beim ersten Verbindungsversuch erscheint dafür eine Berechtigungsabfrage — bitte bestätigen.
                </p>
            </div>

            <form
                class="flex flex-col gap-6"
                @submit.prevent="handleSave"
            >
                <div class="flex flex-col gap-2">
                    <label for="api-url" class="text-xs text-text-variant uppercase">
                        API-URL
                    </label>
                    <input
                        id="api-url"
                        v-model="urlInput"
                        type="url"
                        required
                        name="api-url"
                        autocomplete="off"
                        placeholder="http://localhost:5000"
                        class="w-full bg-surface-low p-4 rounded-lg shadow-sunken"
                    >
                    <p class="text-2xs text-text-variant">
                        Standard: {{ defaultApiUrl }}
                    </p>
                </div>

                <div class="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        class="btn-primary"
                        :disabled="isSaving"
                    >
                        Speichern
                    </button>
                    <button
                        type="button"
                        class="btn-secondary"
                        :disabled="isSaving"
                        @click="handleReset"
                    >
                        Zurücksetzen
                    </button>
                </div>

                <div
                    v-if="isVerifying"
                    class="text-sm text-text-variant"
                    role="status"
                >
                    Laden…
                </div>

                <div
                    v-else-if="successMessage"
                    class="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300"
                    role="status"
                >
                    {{ successMessage }}
                </div>

                <div
                    v-else-if="apiConnectionError"
                    class="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
                    role="alert"
                >
                    {{ API_CONNECTION_ERROR_MESSAGE }}
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { apiUrl, setApiUrl, defaultApiUrl, refreshApiQueries } = useApiUrl();
const { apiConnectionError, clearApiConnectionError } = useApiError();

const urlInput = ref(apiUrl.value);
const successMessage = ref('');
const isSaving = ref(false);
const isVerifying = ref(false);
const redirectTimerId = ref<ReturnType<typeof setTimeout>>();

watch(apiUrl, (value) => {
    urlInput.value = value;
});

onUnmounted(() => {
    if (redirectTimerId.value !== undefined) {
        clearTimeout(redirectTimerId.value);
    }
});

const clearRedirectTimer = () => {
    if (redirectTimerId.value !== undefined) {
        clearTimeout(redirectTimerId.value);
        redirectTimerId.value = undefined;
    }
};

const redirectAfterDelay = (message: string) => {
    successMessage.value = message;
    isSaving.value = true;
    redirectTimerId.value = setTimeout(() => navigateTo('/'), 2000);
};

const saveApiUrl = async (url: string, successMsg: string) => {
    clearRedirectTimer();
    successMessage.value = '';
    clearApiConnectionError();
    isSaving.value = true;
    isVerifying.value = true;

    setApiUrl(url);
    const connected = await verifyApiConnection();
    isVerifying.value = false;

    if (!connected) {
        isSaving.value = false;
        await refreshApiQueries();
        return;
    }

    await refreshApiQueries();
    redirectAfterDelay(successMsg);
};

const handleSave = async () => {
    await saveApiUrl(urlInput.value, 'Einstellungen gespeichert. Du wirst weitergeleitet…');
};

const handleReset = async () => {
    urlInput.value = defaultApiUrl;
    await saveApiUrl(defaultApiUrl, 'Standard-URL wiederhergestellt. Du wirst weitergeleitet…');
};
</script>
