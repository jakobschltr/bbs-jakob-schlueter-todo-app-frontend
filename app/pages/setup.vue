<template>
    <div class="flex justify-center">
        <div class="w-full">
            <h2 class="text-lg font-bold mb-2">
                Willkommen
            </h2>
            <p class="text-text-variant text-sm mb-8">
                Bevor du startest, gib die Adresse deiner API ein.
            </p>

            <div
                class="mb-8 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200"
                role="note"
            >
                <p class="font-medium mb-1">
                    Lokale Netzwerk-Verbindung
                </p>
                <p class="text-amber-800/90 dark:text-amber-200/90">
                    Hostest du dein Backend im Heimnetzwerk — z. B. auf einem
                    <strong>Raspberry Pi</strong> oder <strong>Linux-Server</strong>
                    unter einer lokalen IP wie
                    <code class="rounded bg-amber-500/15 px-1">192.168.1.50</code>
                    — oder auf diesem Rechner unter
                    <code class="rounded bg-amber-500/15 px-1">localhost</code>,
                    fragt Chrome beim ersten Zugriff, ob diese Website auf andere Geräte
                    in deinem Netzwerk zugreifen darf
                    (z. B. „Auf andere Apps und Dienste auf diesem Gerät zugreifen“).
                    Die App kann das nicht selbst erlauben — klicke unten auf
                    <strong>Browser-Berechtigung anfordern</strong> und wähle
                    <strong>Zulassen</strong>.
                </p>
            </div>

            <form
                class="flex flex-col gap-6"
                @submit.prevent="handleSubmit"
            >
                <div class="flex flex-col gap-2">
                    <label for="setup-api-url" class="text-xs text-text-variant uppercase">
                        API-URL
                    </label>
                    <input
                        id="setup-api-url"
                        v-model="urlInput"
                        type="url"
                        required
                        name="setup-api-url"
                        autocomplete="off"
                        placeholder="http://localhost:5000"
                        class="w-full bg-surface-low p-4 text-base rounded-lg shadow-sunken"
                    >
                    <p class="text-2xs text-text-variant">
                        Beispiele: {{ defaultApiUrl }} oder http://192.168.1.50:5000
                    </p>
                </div>

                <div class="flex flex-wrap gap-3">
                    <button
                        type="submit"
                        class="btn-primary w-full sm:w-auto"
                        :disabled="isSaving"
                    >
                        Verbinden
                    </button>
                    <button
                        v-if="needsLocalNetworkAccess"
                        type="button"
                        class="btn-secondary w-full sm:w-auto"
                        :disabled="isSaving || isRequestingPermission"
                        @click="handleRequestNetworkAccess"
                    >
                        Browser-Berechtigung anfordern
                    </button>
                </div>

                <div
                    v-if="permissionHint"
                    class="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200"
                    role="status"
                >
                    {{ permissionHint }}
                </div>

                <div
                    v-if="isVerifying"
                    class="text-sm text-text-variant"
                    role="status"
                >
                    Laden…
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
definePageMeta({
    layout: 'setup',
});

const { apiUrl, setApiUrl, defaultApiUrl, refreshApiQueries } = useApiUrl();
const { apiConnectionError, clearApiConnectionError } = useApiError();

const urlInput = ref(defaultApiUrl);
const isSaving = ref(false);
const isVerifying = ref(false);
const isRequestingPermission = ref(false);
const permissionHint = ref('');

const normalizedUrlInput = computed(
    () => urlInput.value.trim().replace(/\/+$/, '') || defaultApiUrl,
);

const needsLocalNetworkAccess = computed(
    () => isLocalNetworkApiUrl(normalizedUrlInput.value),
);

const handleRequestNetworkAccess = async () => {
    permissionHint.value = '';
    isRequestingPermission.value = true;

    try {
        const result = await requestLocalNetworkAccess(normalizedUrlInput.value);

        if (result === 'granted') {
            permissionHint.value = 'Zugriff erlaubt. Du kannst jetzt „Verbinden“ klicken.';
            return;
        }

        if (result === 'denied') {
            permissionHint.value = 'Zugriff blockiert. In Chrome: Schloss-Symbol → Website-Einstellungen → Lokales Netzwerk auf „Zulassen“ setzen.';
            return;
        }

        if (result === 'unsupported') {
            permissionHint.value = 'Dein Browser unterstützt die lokale Netzwerk-Berechtigung nicht. Nutze Chrome (aktuell) oder starte die App lokal mit npm run dev.';
            return;
        }

        permissionHint.value = 'Wähle im Browser-Dialog „Zulassen“, dann erneut „Verbinden“ klicken.';
    } finally {
        isRequestingPermission.value = false;
    }
};

const handleSubmit = async () => {
    clearApiConnectionError();
    isSaving.value = true;
    isVerifying.value = true;

    try {
        apiUrl.value = urlInput.value.trim().replace(/\/+$/, '') || defaultApiUrl;
        const connected = await verifyApiConnection();

        if (!connected) {
            return;
        }

        setApiUrl(urlInput.value);
        await refreshApiQueries();
        await navigateTo('/');
    } finally {
        isVerifying.value = false;
        isSaving.value = false;
    }
};
</script>
