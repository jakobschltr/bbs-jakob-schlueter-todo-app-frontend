<template>
  <div class="">
    {{ todos }}
  </div>
</template>

<script lang="ts" setup>
const listId = ref('list1');

const { todos, isLoading } = useTodolist(listId);

console.log(todos.value);
</script>