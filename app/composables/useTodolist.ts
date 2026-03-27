export type Entry = {
  id: string,
  name: string,
  description: string,
  user_id: string,
  list_id: string
}

export type Todolist = {
  id: string,
  name: string
}

export const useTodolist = (listId: Ref<string> | string) => {
  const queryCache = useQueryCache();
  const config = useRuntimeConfig();
  const baseUrl = 'http://127.0.0.1:5000'
  
  const listQuery = useQuery({
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
  })

  return {
    todos: computed(() => listQuery.data.value?.data ?? []),
    exists: computed(() => listQuery.data.value?.exists ?? true),
    isLoading: listQuery.isLoading,
    error: listQuery.error,
    refresh: listQuery.refresh
  };
}
