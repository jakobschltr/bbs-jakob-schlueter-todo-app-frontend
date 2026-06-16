<template>
    <header class="bg-background flex justify-between p-4 items-center shadow-2xs shadow-gray-950/5 sticky top-0">
        <h1 class="text-2xl">
            <NuxtLink
                to="/"
                class="rounded-lg px-1 -mx-1 outline-none transition-colors hover:bg-primary-container hover:text-black focus-visible:ring-2 focus-visible:ring-primary"
            >
                "Mach ich morgen"
            </NuxtLink>
        </h1>
        <div class="flex items-center gap-2">
            <NuxtLink
                to="/settings"
                aria-label="Einstellungen"
                class="w-8 h-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container flex items-center justify-center"
            >
                <Icon name="heroicons-solid:cog-6-tooth" class="h-5 w-5" aria-hidden="true" />
            </NuxtLink>
            <button
                type="button"
                aria-label="Farbschema umschalten"
                class="w-8 h-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container flex items-center justify-center"
                @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
            >
                <ClientOnly>
                    <Icon
                        v-if="colorMode.value === 'light'"
                        name="heroicons-solid:sun"
                        class="h-5 w-5"
                        aria-hidden="true"
                    />
                    <Icon
                        v-else
                        name="heroicons-solid:moon"
                        class="h-5 w-5"
                        aria-hidden="true"
                    />
                    <template #fallback>
                        <span class="block h-5 w-5" aria-hidden="true" />
                    </template>
                </ClientOnly>
            </button>
        </div>
    </header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
</script>
