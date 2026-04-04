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
                <span
                    v-if="colorMode.value === 'light'"        
                    class="block h-full w-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-full}"
                    aria-hidden="true"
                    v-html="lightbulbFullIconSvg"
                />
                <span
                    v-else        
                    class="block h-full w-full flex items-center justify-center [&_svg]:h-full [&_svg]:w-full}"
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
