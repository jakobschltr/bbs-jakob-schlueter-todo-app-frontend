<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex justify-center items-center"
    >
        <button
            type="button"
            class="fixed inset-0 backdrop-blur-sm bg-overlay hover:cursor-pointer"
            @click="closeModal"
        />
        <div class="p-6 relative bg-background rounded-lg min-w-120 shadow-sunken">
            <h2 class="text-xl font-bold">Liste Erstellen</h2>
            <span class="text-sm text-text-variant">Erstelle eine Liste für deinen Workspace</span>
            
            <button
                type="button"
                aria-label="Dialog schließen"
                class="absolute right-4 top-4 w-8 h-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container flex items-center justify-center"
                @click="closeModal"
            >
                <Icon name="heroicons-solid:x-mark" class="h-5 w-5" aria-hidden="true" />
            </button>

            <div>
                <ModalFormListForm v-if="inputFields === 'creatList'" />
                <ModalFormEntryForm v-if="inputFields === 'createEntry'" :name="modalProps?.name ?? undefined" />
                <ModalFormEntryForm
                    v-if="inputFields === 'updateEntry'"
                    :entry-id="modalProps?.entryId ?? undefined"
                    :name="modalProps?.name ?? undefined"
                    :description="modalProps?.description ?? undefined"
                />
            </div>

            <div class="flex justify-end gap-x-2">
                <button
                    type="button"
                    class="btn-secondary w-1/2"
                    @click="closeModal"
                >
                    Abbrechen
                </button>
                <button
                    type="submit"
                    form="modal-form"
                    class="btn-primary w-1/2"
                >
                    Speichern
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const store = useModalStore();
const { isOpen, inputFields, modalProps } = storeToRefs(store);
const { closeModal } = useModalStore();
</script>
