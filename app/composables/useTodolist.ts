export type Todolist = {
  id: string,
  name: string
}

export const useTodolist = (listId: Ref<string> | string) => {
    const baseUrl = 'http://127.0.0.1:5000';
  
    const listEntrys = useQuery({
        key: () => ['todos', unref(listId)],
        enabled: import.meta.client,
        query: async () => {
            try {
                const data = await $fetch<Entry[]>(`${baseUrl}/todo-list/${unref(listId)}`);
                return { data, exists: true as const };
            } catch (error: unknown) {
                const status =
          error && typeof error === 'object' && 'statusCode' in error
              ? (error as { statusCode?: number }).statusCode
              : undefined;
                if (status === 404) {
                    return { data: [] as Entry[], exists: false as const };
                }
                throw error;
            }
        },
    });

    return {
        todos: computed(() => listEntrys.data.value?.data ?? []),
        exists: computed(() => listEntrys.data.value?.exists ?? true),
        isLoading: listEntrys.isLoading,
        error: listEntrys.error,
        refresh: listEntrys.refresh,
    };
};
