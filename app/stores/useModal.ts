type inputForm = 'creatList' | 'createEntry' | 'updateEntry';
type ModalProps = {
    entryId?: string;
    name?: string;
    description?: string;
};

export const useModalStore = defineStore('modalStore', () => {
    const isOpen = ref(false);
    const inputFields = ref<inputForm | undefined>(undefined);
    const modalProps = ref<ModalProps | undefined>(undefined);

    const openModal = (inputForm: inputForm, props?: ModalProps) => {
        inputFields.value = inputForm;
        isOpen.value = true;
        modalProps.value = props ?? undefined;
        console.log(isOpen.value);
    };

    const closeModal = () => {
        isOpen.value = false;
        inputFields.value = undefined;
    };

    return {
        isOpen,
        inputFields,
        modalProps,
        openModal,
        closeModal,
    };
});
