<template>
    <div class="flex flex-col min-h-screen">
        <header class="bg-neutral flex justify-between p-4 items-center">
            <h1 class="text-2xl">Mach ich morgen</h1>
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
    
        <main class="flex-1 flex flex-col p-4 bg-neutral-light">
            <slot />
        </main>
    </div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>
