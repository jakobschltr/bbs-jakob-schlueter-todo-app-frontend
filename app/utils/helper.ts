export const getListIdFromtRoute = () => {
    const route = useRoute();
    const listId = computed(() => {
        const p = route.params.id;
        return (Array.isArray(p) ? p[0] : p) as string | undefined;
    });
    return listId.value;
};
