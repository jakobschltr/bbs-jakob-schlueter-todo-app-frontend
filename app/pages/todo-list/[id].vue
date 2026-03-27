<template>
  <div>
    {{ todos }}
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