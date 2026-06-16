<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex justify-center items-end sm:items-center p-3 sm:p-4"
    >
        <button
            type="button"
            class="fixed inset-0 backdrop-blur-sm bg-overlay hover:cursor-pointer"
            @click="closeModal"
        />
        <div class="relative z-10 w-full max-w-120 max-h-[min(90dvh,calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1.5rem))] overflow-y-auto bg-background rounded-lg p-4 sm:p-6 shadow-sunken">
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

            <div class="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-x-2">
                <button
                    type="button"
                    class="btn-secondary w-full sm:w-1/2"
                    @click="closeModal"
                >
                    Abbrechen
                </button>
                <button
                    type="submit"
                    form="modal-form"
                    class="btn-primary w-full sm:w-1/2"
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
