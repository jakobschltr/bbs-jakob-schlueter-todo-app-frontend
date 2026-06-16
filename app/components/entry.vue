<template>
    <div class="bg-primary rounded-l-lg rounded-r-xl shadow-xl">
        <div class="group bg-surface-lowest rounded-lg pl-4 py-2 pr-2 ml-1 text-primary-text flex">
            <div class="flex-1 flex flex-col justify-center gap-1 min-h-8">
                <h3 class="font-bold">{{ entry.name }}</h3>
                <p v-if="entry.description" class="text-sm">{{ entry.description }}</p>
            </div>
            <div class="flex gap-1">
                <button
                    class="w-8 h-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container hidden group-hover:flex items-center justify-center"
                    type="button"
                    aria-label="Eintrag bearbeiten"
                    @click="openModal('updateEntry', { entryId: entry.id, name: entry.name, description: entry.description })"
                >
                    <Icon name="heroicons-solid:pencil-square" class="h-3/5 w-3/5" aria-hidden="true" />
                </button>
                <button
                    class="w-8 h-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container hidden group-hover:flex items-center justify-center"
                    type="button"
                    aria-label="Eintrag löschen"
                    @click="deleteEntry({ entryId: entry.id })"
                >
                    <Icon name="heroicons-solid:trash" class="h-1/2 w-1/2" aria-hidden="true" />
                </button>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
defineProps<{
  entry: Entry,
}>();

const { openModal } = useModalStore();
const { deleteEntry } = useTodolistEntrysFromRoute();
</script>
