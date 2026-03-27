<template>
    <span class="hidden" aria-hidden="true" />
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: () => navigateTo('/', { redirectCode: 301 }),
});
</script>
