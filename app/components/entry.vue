<template>
    <div class="bg-primary rounded-l-lg rounded-r-xl shadow-xl">
        <div class="bg-neutral rounded-lg pl-4 py-2 pr-2 ml-1 text-primary-text flex">
            <div class="flex-1">
                <h3 class="font-bold mb-2">{{ entry.name }}</h3>
                <p class="text-sm">{{ entry.description }}</p>
            </div>
            <div class="flex gap-2">
                <button
                    class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center button-class"
                    type="button"
                    @click="editEntry({ entryId: entry.id, name: 'Test1', description: 'Test2' })"
                >
                    <span
                        class="block h-3/5 w-3/5 flex items-center justify-center [&_svg]:h-full [&_svg]:w-full"
                        aria-hidden="true"
                        v-html="editIconSvg"
                    />
                </button>
                <button
                    class="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center button-class"
                    @click="deleteEntry({ entryId: entry.id })"
                >
                    <span
                        class="block h-1/2 w-1/2 flex items-center justify-center [&_svg]:h-full [&_svg]:w-full"
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

defineProps<{
  entry: Entry,
}>();

const { deleteEntry, editEntry } = useTodolistEntrysFromRoute();
</script>
