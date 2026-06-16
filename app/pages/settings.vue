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
                    Lokale Netzwerk-Verbindung
                </p>
                <p class="text-amber-800/90 dark:text-amber-200/90">
                    Hostest du dein Backend im Heimnetzwerk — z. B. auf einem
                    <strong>Raspberry Pi</strong> oder <strong>Linux-Server</strong>
                    unter einer lokalen IP wie
                    <code class="rounded bg-amber-500/15 px-1">192.168.24.114</code>
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
                        class="w-full bg-surface-low p-4 text-base rounded-lg shadow-sunken"
                    >
                    <p class="text-2xs text-text-variant">
                        Standard: {{ defaultApiUrl }} · Beispiel im Netzwerk: http://192.168.1.50:5000
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
                        v-if="needsLocalNetworkAccess"
                        type="button"
                        class="btn-secondary"
                        :disabled="isSaving || isRequestingPermission"
                        @click="handleRequestNetworkAccess"
                    >
                        Browser-Berechtigung anfordern
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
const isRequestingPermission = ref(false);
const permissionHint = ref('');
const redirectTimerId = ref<ReturnType<typeof setTimeout>>();

const normalizedUrlInput = computed(
    () => urlInput.value.trim().replace(/\/+$/, '') || defaultApiUrl,
);

const needsLocalNetworkAccess = computed(
    () => isLocalNetworkApiUrl(normalizedUrlInput.value),
);

const handleRequestNetworkAccess = async () => {
    permissionHint.value = '';
    isRequestingPermission.value = true;

    const result = await requestLocalNetworkAccess(normalizedUrlInput.value);
    isRequestingPermission.value = false;

    if (result === 'granted') {
        permissionHint.value = 'Zugriff erlaubt. Du kannst jetzt „Speichern“ klicken.';
        return;
    }

    if (result === 'denied') {
        permissionHint.value = 'Zugriff blockiert. In Chrome: Schloss-Symbol → Website-Einstellungen → Lokales Netzwerk auf „Zulassen“ setzen.';
        return;
    }

    permissionHint.value = 'Wähle im Browser-Dialog „Zulassen“, dann erneut „Speichern“ klicken.';
};

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
