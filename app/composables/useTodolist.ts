export type Todolist = {
  id: string,
  name: string
}

export const useTodoLists = () => {
    const baseUrl = 'http://127.0.0.1:5000';
    const queryCache = useQueryCache();

    const todoListsQuery = useQuery({
        key: () => ['todolists'],
        enabled: import.meta.client,
        query: async () => $fetch<Todolist[]>(`${baseUrl}/todo-list`),
    });

    const createTodoListMutation = useMutation({
        mutation: async ({ name }: { name: string }) => {
            await $fetch(`${baseUrl}/todo-list`, {
                method: 'POST',
                body: {
                    'id': Math.floor(Math.random()*10000000),
                    name,
                },
            });
        },
        onSettled: () => {
            console.log('triggering refesh');
            queryCache.invalidateQueries({ key: ['todolists'] });
        },
    });

    const deleteTodolistMutation = useMutation({
        mutation: async ({ listId }: { listId: string }) => {
            await $fetch(`${baseUrl}/todo-list/${listId}`, { method: 'DELETE' });
        },
        onSettled: () => queryCache.invalidateQueries({ key: ['todolists'] }),
    });

    return {
        todoLists: computed(() => todoListsQuery.data.value ?? []),
        createTodoList: createTodoListMutation.mutate,
        deleteTodoList: deleteTodolistMutation.mutate,
    };
};
