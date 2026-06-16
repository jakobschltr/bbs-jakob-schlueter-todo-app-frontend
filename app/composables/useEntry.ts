export type Entry = {
  id: string,
  name: string,
  description: string,
  user_id: string,
  list_id: string
}

type ListIdSource = Ref<string | undefined> | string | undefined;

const normalizeListId = (id: ListIdSource) =>
    computed(() => {
        if (id === undefined) {
            return undefined;
        }
        const v = unref(id);
        return v === '' ? undefined : v;
    });

export const useTodoEntries = (listId?: ListIdSource) => {
    const { fetchFromApi } = useApiFetch();
    const { apiUrl } = useApiUrl();
    const { setApiConnectionError, clearApiConnectionError } = useApiError();
    const activeListId = normalizeListId(listId);
    const queryCache = useQueryCache();
  
    const entriesQuery = useQuery({
        key: () => ['todos', activeListId.value ?? '', apiUrl.value],
        enabled: computed(() => import.meta.client && activeListId.value !== undefined),
        query: async () => {
            const id = activeListId.value;
            if (id === undefined) {
                return { data: [] as Entry[], exists: true as const };
            }
            try {
                const data = await fetchFromApi<Entry[]>(`/todo-list/${id}`);
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

    watch(() => entriesQuery.error.value, (error) => {
        if (error) {
            setApiConnectionError(error);
        } else if (entriesQuery.status.value === 'success') {
            clearApiConnectionError();
        }
    }, { immediate: true });

    const createEntryMutation = useMutation({
        mutation: async ({ name, description }: { name: string, description: string }) => {
            await fetchFromApi(`/todo-list/${activeListId.value}`, {
                method: 'POST',
                body: {
                    name,
                    description,
                },
            });
        },
        onSettled: () => {
            if(activeListId.value) queryCache.invalidateQueries({ key: ['todos', activeListId.value] });
        },
    });

    const deleteEntryMutation = useMutation({
        mutation: async ({ entryId }: { entryId: string }) => {
            await fetchFromApi(`/entry/${entryId}`, { method: 'DELETE' });
        },
        onSettled: () => {
            if(activeListId.value) queryCache.invalidateQueries({ key: ['todos', activeListId.value] });
        },
    });

    const editEntryMutation = useMutation({
        mutation: async ({ entryId, name, description }: { entryId: string, name: string, description: string }) => {
            await fetchFromApi(`/entry/${entryId}`, {
                method: 'PATCH',
                body: {
                    name,
                    description,
                },
            });
        },
        onSettled: () => {
            if(activeListId.value) queryCache.invalidateQueries({ key: ['todos', activeListId.value] });
        },
    });

    return {
        entries: computed(() => entriesQuery.data.value?.data ?? []),
        exists: computed(() => entriesQuery.data.value?.exists ?? true),
        createEntry: createEntryMutation.mutate,
        deleteEntry: deleteEntryMutation.mutate,
        editEntry: editEntryMutation.mutate,
    };
};

export const useTodolistEntrysFromRoute = () => useTodoEntries(getListIdFromtRoute());
