<template>
    <div>
        <div>
            <h2 class="text-md font-bold">Du hast heute {{ entries.length }} Aufgaben vor dir</h2>
        </div>
        <button
            @click="createEntry({ name: 'Test1', description: 'Test 2' })"
        >
            Neuer Eintrag
        </button>
        <div class="flex flex-col gap-4 mt-4">
            <Entry v-for="entry in entries" :key="entry.id" :entry="entry" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { entries, exists, createEntry } = useTodolistEntrysFromRoute();

watch(
    exists,
    (val) => {
        if (val === false) navigateTo('/', { replace: true });
    },
    { immediate: true },
);
</script>
