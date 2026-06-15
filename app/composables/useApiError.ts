export const useApiError = () => {
    const apiConnectionError = useState('api-connection-error', () => false);

    const setApiConnectionError = (error: unknown) => {
        apiConnectionError.value = isApiConnectionError(error);
    };

    const clearApiConnectionError = () => {
        apiConnectionError.value = false;
    };

    return {
        apiConnectionError,
        setApiConnectionError,
        clearApiConnectionError,
    };
};
