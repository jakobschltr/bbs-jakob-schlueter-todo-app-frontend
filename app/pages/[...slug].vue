<template>

</template>

<script lang="ts" setup>
definePageMeta({
  middleware: () => {
    return navigateTo('/', { redirectCode: 301 });
  }
})
</script>