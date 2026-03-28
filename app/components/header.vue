<template>
    <header class="bg-neutral flex justify-between p-4 items-center shadow-xs shadow-border sticky top-0 z-10">
        <h1 class="text-2xl">"Mach ich morgen"</h1>
        <button
            type="button"
            aria-label="Farbschema umschalten"
            class="h-6 w-6"
            @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        >
            <ClientOnly>
                <Icon
                    v-if="colorMode.value === 'light'"
                    class="h-full w-full"
                    name="material-symbols:light-mode-outline-rounded"
                />
                <Icon
                    v-else
                    class="h-full w-full"
                    name="material-symbols:dark-mode-outline-rounded"
                />
                <template #fallback>
                    <span class="block h-full w-full" aria-hidden="true" />
                </template>
            </ClientOnly>
        </button>
    </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>
