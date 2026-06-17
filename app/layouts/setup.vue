<template>
    <div class="min-h-screen flex flex-col">
        <header class="bg-background p-4 pt-[max(1rem,env(safe-area-inset-top))] shadow-2xs shadow-gray-950/5">
            <h1 class="text-xl sm:text-2xl text-center flex items-center justify-center gap-2 w-full">
                <Icon name="heroicons-solid:home" class="h-6 w-6 shrink-0" aria-hidden="true" />
                "Mach ich morgen"
            </h1>
        </header>
        <main class="flex-1 flex justify-center p-3 sm:p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div class="max-w-2xl w-full min-w-0">
                <slot />
            </div>
        </main>
    </div>
</template>
