export type Todolist = {
  id: string,
  name: string
}

export const useTodoLists = () => {
    const baseUrl = 'http://127.0.0.1:5000';
    const queryCache = useQueryCache();
    const route = useRoute();

    const todoListsQuery = useQuery({
        key: () => ['todolists'],
        enabled: import.meta.client,
        query: async () => $fetch<Todolist[]>(`${baseUrl}/todo-list`),
    });

    const createTodoListMutation = useMutation({
        mutation: async ({ name }: { name: string }) => await $fetch<Todolist>(`${baseUrl}/todo-list`, {
            method: 'POST',
            body: {
                name,
            },
        }),
        onSuccess: (created) => {
            navigateTo(`/todo-list/${created.id}`);
        },
        onSettled: () => {
            queryCache.invalidateQueries({ key: ['todolists'] });
        },
    });

    const deleteTodolistMutation = useMutation({
        mutation: async ({ listId }: { listId: string }) => {
            await $fetch(`${baseUrl}/todo-list/${listId}`, { method: 'DELETE' });
        },
        onSuccess: (_data, { listId }) => {
            const param = route.params.id;
            const currentId = Array.isArray(param) ? param[0] : param;
            if (currentId !== undefined && String(currentId) === String(listId)) {
                navigateTo('/', { replace: true });
            }
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['todolists'] }),
    });

    return {
        todoLists: computed(() => todoListsQuery.data.value ?? []),
        createTodoList: createTodoListMutation.mutate,
        deleteTodoList: deleteTodolistMutation.mutate,
    };
};
