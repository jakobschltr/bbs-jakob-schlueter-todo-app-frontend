<template>
    <button
        v-if="isOpen"
        type="button"
        class="fixed inset-0 z-40 bg-overlay md:hidden"
        aria-label="Navigation schließen"
        @click="close"
    />

    <aside
        class="bg-surface-low flex flex-col min-h-0 z-50 max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:overflow-hidden transform transition-transform duration-200 ease-out md:static md:w-65 md:max-w-none md:translate-x-0 md:flex-none md:h-screen md:overflow-visible"
        :class="isOpen
            ? 'max-md:translate-x-0 max-md:w-[min(18rem,85vw)] max-md:pointer-events-auto'
            : 'max-md:-translate-x-full max-md:w-0 max-md:pointer-events-none md:translate-x-0 md:pointer-events-auto'"
        aria-label="Listen-Navigation"
    >
        <div class="mb-4 flex-none p-4 pb-0 pr-2 flex items-start justify-between gap-2">
            <div class="flex flex-col min-w-0">
                <h2 class="text-xl">
                    Sammlung
                </h2>
                <span class="text-2xs">Deine Listen</span>
            </div>
            <button
                type="button"
                class="md:hidden shrink-0 min-h-11 min-w-11 flex items-center justify-center rounded-lg hover:bg-background"
                aria-label="Navigation schließen"
                @click="close"
            >
                <Icon name="heroicons-solid:x-mark" class="h-5 w-5" aria-hidden="true" />
            </button>
        </div>

        <div class="flex-1 overflow-y-auto px-4 pr-2 scrollbar-thin">
            <div
                v-for="list in todoLists"
                :key="list.id"
                class="group w-full min-h-11 hover:bg-background hover:shadow-sunken rounded-lg flex items-center relative mb-1"
            >
                <NuxtLink
                    :to="`/todo-list/${list.id}`"
                    class="w-full text-md p-2 truncate"
                    @click="close"
                >
                    {{ list.name }}
                </NuxtLink>
                <div
                    class="flex md:hidden md:group-hover:flex h-full aspect-square w-auto items-center justify-center"
                >
                    <button
                        type="button"
                        class="flex min-h-11 min-w-11 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container items-center justify-center"
                        :aria-label="`Liste ${list.name} löschen`"
                        @click="deleteTodoList({ listId: list.id })"
                    >
                        <Icon name="heroicons-solid:trash" class="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>

        <div class="flex-none p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
                class="btn-primary w-full"
                @click="openModal('creatList')"
            >
                Add New List
            </button>
        </div>
    </aside>
</template>

<script lang="ts" setup>
const route = useRoute();
const { openModal } = useModalStore();
const { todoLists, deleteTodoList } = useTodoLists();
const { isOpen, close } = useMobileNavigation();

const applyBodyScrollLock = () => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    document.body.style.overflow = isOpen.value && !isDesktop ? 'hidden' : '';
};

watch(isOpen, applyBodyScrollLock);

onMounted(() => {
    applyBodyScrollLock();
    window.matchMedia('(min-width: 768px)').addEventListener('change', applyBodyScrollLock);
});

onUnmounted(() => {
    window.matchMedia('(min-width: 768px)').removeEventListener('change', applyBodyScrollLock);
    document.body.style.overflow = '';
});

watch(() => route.fullPath, () => {
    close();
});
</script>
