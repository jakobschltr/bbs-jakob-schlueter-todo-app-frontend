<template>
    <div class="flex flex-col gap-4 my-8">
        <form
            id="modal-form"
            class="flex flex-col gap-2"
            @submit.prevent="handleSubmit"
        >
            <div>
                <label for="entry-title" class="text-xs text-text-variant uppercase">Aufgaben Name</label>
                <input
                    id="entry-title"
                    v-model="entryTitle"
                    type="text"
                    required
                    name="entry-title"
                    autocomplete="off"
                    class="w-full bg-surface-low p-2 text-base rounded-lg"
                >
            </div>
            <div>
                <label for="entry-description" class="text-xs text-text-variant uppercase">Beschreibung</label>
                <textarea
                    id="entry-description"
                    v-model="entryDescription"
                    name="entry-description"
                    autocomplete="off"
                    class="w-full bg-surface-low p-2 text-base rounded-lg min-h-22 h-22 max-h-48"
                />
            </div>  
        </form>
    </div>
</template>

<script lang="ts" setup>
const { entryId = undefined, name = undefined, description = undefined } = defineProps<{
    entryId?: string;
    name?: string;
    description?: string;
}>();

const { closeModal } = useModalStore();
const { createEntry, editEntry } = useTodolistEntrysFromRoute();

const entryTitle = ref(name ?? '');
const entryDescription = ref(description ?? '');

const handleSubmit = () => {
    if (entryId) {
        editEntry({ entryId, name: entryTitle.value, description: entryDescription.value });
    } else {
        createEntry({ name: entryTitle.value, description: entryDescription.value });
    }
    closeModal();
};
</script>
