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
        <button
            type="button"
            aria-label="Farbschema umschalten"
            class="w-8 h-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container "
            @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        >
            <ClientOnly>
                <span
                    v-if="colorMode.value === 'light'"        
                    class="block h-full w-full flex items-center justify-center [&_svg]:h-5 [&_svg]:w-5}"
                    aria-hidden="true"
                    v-html="lightbulbFullIconSvg"
                />
                <span
                    v-else        
                    class="block h-full w-full flex items-center justify-center [&_svg]:h-5 [&_svg]:w-5"
                    aria-hidden="true"
                    v-html="lightbulbEmptyIconSvg"
                />
                <template #fallback>
                    <span class="block h-full w-full" aria-hidden="true" />
                </template>
            </ClientOnly>
        </button>
    </header>
</template>

<script lang="ts" setup>
import lightbulbEmptyIconSvg from '~/assets/lightbulb-empty-icon.svg?raw';
import lightbulbFullIconSvg from '~/assets/lightbulb-filled-icon.svg?raw';

const colorMode = useColorMode();
</script>
