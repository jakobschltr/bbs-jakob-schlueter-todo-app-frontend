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
                    v-if="successMessage"
                    class="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300"
                    role="status"
                >
                    {{ successMessage }}
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { apiUrl, setApiUrl, resetApiUrl, defaultApiUrl } = useApiUrl();
const queryCache = useQueryCache();

const urlInput = ref(apiUrl.value);
const successMessage = ref('');
const isSaving = ref(false);

watch(apiUrl, (value) => {
    urlInput.value = value;
});

const redirectAfterDelay = (message: string) => {
    successMessage.value = message;
    isSaving.value = true;
    setTimeout(() => navigateTo('/'), 2000);
};

const handleSave = () => {
    setApiUrl(urlInput.value);
    queryCache.invalidateQueries();
    redirectAfterDelay('Einstellungen gespeichert. Du wirst weitergeleitet…');
};

const handleReset = () => {
    resetApiUrl();
    urlInput.value = defaultApiUrl;
    queryCache.invalidateQueries();
    redirectAfterDelay('Standard-URL wiederhergestellt. Du wirst weitergeleitet…');
};
</script>
