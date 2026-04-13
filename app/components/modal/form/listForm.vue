<template>
    <div class="flex flex-col gap-4 my-8">
        <form
            id="modal-form"
            class="flex flex-col gap-2"
            @submit.prevent="handleSubmit"
        >
            <label for="list-title" class="text-xs text-text-variant uppercase">Listen Name</label>
            <input
                id="list-title"
                v-model="listTitle"
                type="text"
                required
                name="list-title"
                autocomplete="off"
                class="w-full bg-surface-low p-2 rounded-lg"
            >
        </form>
    </div>
</template>

<script lang="ts" setup>
const { closeModal } = useModalStore();
const { createTodoList } = useTodoLists();

const listTitle = ref('');

const handleSubmit = () => {
    createTodoList({ name: listTitle.value });
    closeModal();
};
</script>
