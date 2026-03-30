export type Entry = {
  id: string,
  name: string,
  description: string,
  user_id: string,
  list_id: string
}

export const useEntry = () => {
    const baseUrl = 'http://127.0.0.1:5000';
    const queryCache = useQueryCache();
  
    const deleteEntry = useMutation({
        mutation: async ({ entryId, listId }: { entryId: string, listId: string }) => {
            await $fetch(`${baseUrl}/entry/${entryId}`, { method: 'DELETE' });
            return { listId };
        },
        onSettled: (_data, _error, variables) => {
            if (variables?.listId) {
                queryCache.invalidateQueries({ key: ['todos', variables.listId] });
            }
        },
    });

    const editEntry = useMutation({
        mutation: async ({ entryId, listId, name, description }: { entryId: string, listId: string, name: string, description: string }) => {
            await $fetch(`${baseUrl}/entry/${entryId}`, {
                    method: 'PATCH',
                    body: {
                        name,
                        description
                    }
                }
            )
        },
        onSettled: (_data, _error, variables) => {
            if (variables?.listId) {
                queryCache.invalidateQueries({key: ['todos', variables.listId] });
            }
        }
    });

    return {
        deleteEntry,
        editEntry
    };
};
