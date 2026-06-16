<template>
    <div class="flex min-h-screen">
        <Navigation />
        <div class="w-full">
            <Header />
            <ApiErrorBanner />
            <main class="flex-1 flex">
                <div class="w-full flex justify-center p-4">
                    <div class="max-w-6xl w-full">
                        <slot />
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
