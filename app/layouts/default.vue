<template>
    <div class="flex flex-col min-h-screen">
        <Header />
        <main class="flex-1 flex">
            <Navigation />
            <div class="w-full flex justify-center p-4">
                <div class="max-w-6xl w-full">
                    <slot />
                </div>
            </div>
        </main>
    </div>
</template>
