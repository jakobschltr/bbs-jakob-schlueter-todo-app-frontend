export const DEFAULT_API_REQUEST_TIMEOUT_MS = 5000;

const joinApiUrl = (base: string, path: string) =>
    new URL(path.startsWith('/') ? path : `/${path}`, base.endsWith('/') ? base : `${base}/`).href;

const getFetchOptions = (baseUrl: string, options?: Parameters<typeof $fetch>[1]) => {
    const targetAddressSpace = getTargetAddressSpace(baseUrl);
    const { headers, ...rest } = options ?? {};

    return {
        timeout: DEFAULT_API_REQUEST_TIMEOUT_MS,
        ...(targetAddressSpace ? { targetAddressSpace } : {}),
        ...rest,
        headers: {
            'ngrok-skip-browser-warning': 'true',
            ...headers,
        },
    };
};

export const useApiFetch = () => {
    const { apiUrl } = useApiUrl();

    const fetchFromApi = <T>(path: string, options?: Parameters<typeof $fetch>[1]) => {
        const url = joinApiUrl(apiUrl.value, path);
        return $fetch<T>(url, getFetchOptions(apiUrl.value, options));
    };

    return { fetchFromApi, apiUrl };
};

export const verifyApiConnection = async (): Promise<boolean> => {
    const { apiUrl } = useApiUrl();
    const { fetchFromApi } = useApiFetch();
    const { setApiConnectionError, clearApiConnectionError } = useApiError();

    if (getTargetAddressSpace(apiUrl.value)) {
        await requestLocalNetworkAccess(apiUrl.value);
    }

    try {
        await fetchFromApi('/todo-list');
        clearApiConnectionError();
        return true;
    } catch (error) {
        setApiConnectionError(error);
        return false;
    }
};
