<template>
  <div>
    <h2 class="text-md font-bold">Du hast heute {{ todos.length }} Aufgaben vor dir</h2>
  </div>
  <div class="flex flex-col gap-4 mt-4">
    <Entry v-for="entry in todos" :key="entry.id" :entry="entry" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const listId = route.params.id as string;

const { todos, exists, isLoading } = useTodolist(listId);

watch(
  exists,
  (val) => {
    if (val === false) navigateTo('/', { replace: true });
  },
  { immediate: true },
);
</script>