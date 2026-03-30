<template>
    <div class="bg-primary rounded-l-lg rounded-r-xl shadow-xl">
        <div class="bg-neutral rounded-lg pl-4 py-2 pr-2 ml-1 text-primary-text flex">
            <div class="flex-1">
                <h3 class="font-bold mb-2">{{ entry.name }}</h3>
                <p class="text-sm">{{ entry.description }}</p>
            </div>
            <div class="flex gap-2">
                <button
                    class="w-8 h-8 p-1 bg-primary rounded-lg button-class"
                    type="button"
                    @click="editEntry.mutate({ entryId: entry.id, listId: entry.list_id, name: 'Test1', description: 'Test2' })"
                >
                    <span
                        class="block h-full w-full flex items-center justify-center [&_svg]:h-[1.25rem] [&_svg]:w-[1.25rem]}"
                        aria-hidden="true"
                        v-html="editIconSvg"
                    />
                </button>
                <button
                    class="w-8 h-8 p-1 bg-red-500 rounded-lg button-class"
                    @click="deleteEntry.mutate({ entryId: entry.id, listId: entry.list_id })"
                >
                    <span
                        class="block h-full w-full flex items-center justify-center [&_svg]:h-[1rem] [&_svg]:w-[1rem]}"
                        aria-hidden="true"
                        v-html="trashcanIconSvg"
                    />
                </button>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import editIconSvg from '~/assets/edit-icon.svg?raw';
import trashcanIconSvg from '~/assets/trashcan-icon.svg?raw';

const { deleteEntry, editEntry } = useEntry();

defineProps<{
  entry: Entry
}>();
</script>
