export type Todolist = {
  id: string,
  name: string
}

export const useTodoLists = () => {
    const { fetchFromApi } = useApiFetch();
    const { apiUrl } = useApiUrl();
    const { setApiConnectionError, clearApiConnectionError } = useApiError();
    const queryCache = useQueryCache();
    const route = useRoute();

    const todoListsQuery = useQuery({
        key: () => ['todolists', apiUrl.value],
        enabled: import.meta.client,
        query: async () => fetchFromApi<Todolist[]>('/todo-list'),
    });

    watch(() => todoListsQuery.error.value, (error) => {
        if (error) {
            setApiConnectionError(error);
        } else if (todoListsQuery.status.value === 'success') {
            clearApiConnectionError();
        }
    }, { immediate: true });

    const createTodoListMutation = useMutation({
        mutation: async ({ name }: { name: string }) => await fetchFromApi<Todolist>('/todo-list', {
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
            await fetchFromApi(`/todo-list/${listId}`, { method: 'DELETE' });
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
