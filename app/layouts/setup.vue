<template>
    <div class="min-h-screen flex flex-col">
        <header class="bg-background p-4 shadow-2xs shadow-gray-950/5">
            <h1 class="text-2xl text-center">
                "Mach ich morgen"
            </h1>
        </header>
        <main class="flex-1 flex justify-center p-4">
            <div class="max-w-2xl w-full">
                <slot />
            </div>
        </main>
    </div>
</template>
