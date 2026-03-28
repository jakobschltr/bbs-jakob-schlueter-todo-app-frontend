<template>
    <div class="bg-primary rounded-l-lg rounded-r-xl shadow-xs shadow-border">
        <div class="bg-neutral rounded-lg p-4 ml-1 text-primary-text">
            <h3 class="font-bold mb-2">{{ entry.name }}</h3>
            <p class="text-sm">{{ entry.description }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
  entry: Entry
}>();
</script>
