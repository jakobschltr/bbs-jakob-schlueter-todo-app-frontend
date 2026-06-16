<template>
    <header class="bg-background flex justify-between gap-3 p-4 pt-[max(1rem,env(safe-area-inset-top))] items-center shadow-2xs shadow-gray-950/5 sticky top-0 z-30">
        <div class="flex items-center gap-2 min-w-0 flex-1">
            <button
                type="button"
                class="md:hidden shrink-0 min-h-11 min-w-11 flex items-center justify-center rounded-lg hover:bg-primary-container"
                aria-label="Menü öffnen"
                @click="toggle"
            >
                <Icon name="heroicons-solid:bars-3" class="h-6 w-6" aria-hidden="true" />
            </button>
            <h1 class="text-xl sm:text-2xl min-w-0">
                <NuxtLink
                    to="/"
                    class="inline-flex items-center gap-2 min-w-0 rounded-lg px-1 -mx-1 outline-none transition-colors hover:bg-primary-container hover:text-black focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <Icon name="heroicons-solid:home" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    <span class="truncate">"Mach ich morgen"</span>
                </NuxtLink>
            </h1>
        </div>
        <div class="flex items-center gap-1 sm:gap-2 shrink-0">
            <NuxtLink
                to="/settings"
                aria-label="Einstellungen"
                class="min-h-11 min-w-11 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container flex items-center justify-center"
            >
                <Icon name="heroicons-solid:cog-6-tooth" class="h-5 w-5" aria-hidden="true" />
            </NuxtLink>
            <button
                type="button"
                aria-label="Farbschema umschalten"
                class="min-h-11 min-w-11 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container flex items-center justify-center"
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
const { toggle } = useMobileNavigation();
</script>
