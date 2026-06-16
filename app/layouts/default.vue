<template>
    <div class="flex min-h-screen overflow-x-hidden">
        <Navigation />
        <div class="w-full min-w-0">
            <Header />
            <div class="w-full flex justify-center px-3 sm:px-4 pt-3 sm:pt-4">
                <div class="w-full max-w-2xl">
                    <ApiErrorBanner />
                </div>
            </div>
            <main class="flex-1 flex">
                <div class="w-full flex justify-center p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                    <div class="max-w-6xl w-full min-w-0">
                        <slot />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
