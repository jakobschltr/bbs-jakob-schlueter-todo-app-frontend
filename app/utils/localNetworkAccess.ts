type TargetAddressSpace = 'local' | 'loopback';

export type LocalNetworkPermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported';

const isPrivateIpv4 = (hostname: string) =>
    /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname);

export const getTargetAddressSpace = (baseUrl: string): TargetAddressSpace | undefined => {
    try {
        const { hostname } = new URL(baseUrl);

        if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
            return 'loopback';
        }

        if (isPrivateIpv4(hostname) || hostname.endsWith('.local')) {
            return 'local';
        }
    } catch {
        return undefined;
    }

    return undefined;
};

export const queryLocalNetworkPermission = async (): Promise<LocalNetworkPermissionState> => {
    if (!import.meta.client || !('permissions' in navigator)) {
        return 'unsupported';
    }

    try {
        const status = await navigator.permissions.query({ name: 'local-network' as PermissionName });
        if (status.state === 'granted') {
            return 'granted';
        }
        if (status.state === 'denied') {
            return 'denied';
        }
        return 'prompt';
    } catch {
        return 'unsupported';
    }
};

export const requestLocalNetworkAccess = async (baseUrl: string): Promise<LocalNetworkPermissionState> => {
    if (!import.meta.client) {
        return 'unsupported';
    }

    const targetAddressSpace = getTargetAddressSpace(baseUrl);
    if (!targetAddressSpace) {
        return 'unsupported';
    }

    const permission = await queryLocalNetworkPermission();
    if (permission === 'granted') {
        return 'granted';
    }

    const probeUrl = new URL('/todo-list', baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).href;

    try {
        await fetch(probeUrl, { targetAddressSpace });
        return 'granted';
    } catch {
        return await queryLocalNetworkPermission();
    }
};
