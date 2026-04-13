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
                    @click="openModal('updateEntry', { entryId: entry.id, name: entry.name, description: entry.description })"
                >
                    <span
                        class="block h-3/5 w-3/5 flex items-center justify-center [&_svg]:h-full [&_svg]:w-full"
                        aria-hidden="true"
                        v-html="editIconSvg"
                    />
                </button>
                <button
                    class="w-8 h-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container hidden group-hover:flex items-center justify-center"
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

const { openModal } = useModalStore();
const { deleteEntry } = useTodolistEntrysFromRoute();
</script>
