<template>
    <div class="flex justify-center">
        <div class="w-full max-w-4xl">
            <div class="mb-4">
                <span class="text-text-variant text-sm">
                    <NuxtLink to="/">Listen</NuxtLink> > {{ listName }}
                </span>
            </div>

            <h2 class="text-lg font-bold mb-8">Du hast heute {{ entries.length }} Aufgaben vor dir</h2>

            <div class="relative">
                <input
                    v-model="newEntryName"
                    class="w-full p-4 rounded-lg bg-surface-low shadow-sunken"
                    type="text"
                    :placeholder="`Eintrag zu '${listName ?? ''}' hinzufügen`"
                >
                <button class="absolute right-2 self-center w-8 h-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container" @click="openModal('createEntry', { name: newEntryName })">
                    <span class="block h-full w-full flex items-center justify-center [&_svg]:h-5 [&_svg]:w-5" aria-hidden="true" v-html="plusIconSvg" />
                </button>
            </div>

            <div class="flex flex-col gap-4 mt-4">
                <Entry v-for="entry in entries" :key="entry.id" :entry="entry" />
            </div>
                        
        </div>
    </div>
</template>

<script lang="ts" setup>
import plusIconSvg from '~/assets/plus-icon.svg?raw';

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

watch(
    exists,
    (val) => {
        if (val === false) navigateTo('/', { replace: true });
    },
    { immediate: true },
);
</script>
