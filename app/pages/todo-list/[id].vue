<template>
    <div class="flex justify-center">
        <div class="w-full max-w-4xl">
            <div class="mb-4 min-w-0">
                <span class="text-text-variant text-sm truncate block">
                    <NuxtLink to="/">Listen</NuxtLink> > {{ listName }}
                </span>
            </div>

            <h2 class="text-base sm:text-lg font-bold mb-6 sm:mb-8">
                Du hast heute {{ entries.length }} Aufgaben vor dir
            </h2>

            <div class="relative">
                <input
                    id="new-entry-name"
                    v-model="newEntryName"
                    name="new-entry-name"
                    class="w-full p-4 pr-14 text-base rounded-lg bg-surface-low shadow-sunken"
                    type="text"
                    :placeholder="`Eintrag zu '${listName ?? ''}' hinzufügen`"
                >
                <button
                    type="button"
                    class="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-10 min-w-10 p-2 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container flex items-center justify-center"
                    aria-label="Eintrag hinzufügen"
                    @click="handleEntryCreation"
                >
                    <Icon name="heroicons-solid:plus" class="h-5 w-5" aria-hidden="true" />
                </button>
            </div>

            <div class="flex flex-col gap-4 mt-4">
                <Entry v-for="entry in entries" :key="entry.id" :entry="entry" />
            </div>
                        
        </div>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { todoLists } = useTodoLists();
const { entries, exists } = useTodolistEntrysFromRoute();
const { openModal } = useModalStore();

const listId = computed(() => {
    const p = route.params.id;
    return (Array.isArray(p) ? p[0] : p) as string | undefined;
});

const listName = computed(
    () => todoLists.value.find((list) => list.id === listId.value)?.name,
);

const newEntryName = ref('');

const handleEntryCreation = () => {
    openModal('createEntry', { name: newEntryName.value });
    newEntryName.value = '';
};

watch(
    exists,
    (val) => {
        if (val === false) navigateTo('/', { replace: true });
    },
    { immediate: true },
);
</script>
