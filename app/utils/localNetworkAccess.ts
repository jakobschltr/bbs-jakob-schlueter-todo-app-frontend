type TargetAddressSpace = 'local' | 'loopback';

export type LocalNetworkPermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported';

const PROBE_TIMEOUT_MS = 5000;

const parseIpv4Octets = (hostname: string): [number, number, number, number] | null => {
    const match = hostname.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (!match) {
        return null;
    }

    const octets = match.slice(1, 5).map(Number) as [number, number, number, number];
    if (octets.some((octet) => octet > 255)) {
        return null;
    }

    return octets;
};

const isPrivateIpv4 = (hostname: string) => {
    const octets = parseIpv4Octets(hostname);
    if (!octets) {
        return false;
    }

    const [first, second] = octets;
    return first === 10
        || (first === 172 && second >= 16 && second <= 31)
        || (first === 192 && second === 168)
        || first === 127
        || (first === 100 && second >= 64 && second <= 127)
        || (first === 169 && second === 254);
};

export const isLocalNetworkApiUrl = (baseUrl: string) => Boolean(getTargetAddressSpace(baseUrl));

export const getTargetAddressSpace = (baseUrl: string): TargetAddressSpace | undefined => {
    try {
        const { hostname } = new URL(baseUrl);

        if (hostname === 'localhost' || hostname === '[::1]') {
            return 'loopback';
        }

        const octets = parseIpv4Octets(hostname);
        if (octets?.[0] === 127) {
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

const getPermissionName = (targetAddressSpace: TargetAddressSpace) =>
    (targetAddressSpace === 'loopback' ? 'loopback-network' : 'local-network') as PermissionName;

export const queryLocalNetworkPermission = async (
    baseUrl?: string,
): Promise<LocalNetworkPermissionState> => {
    if (!import.meta.client || !('permissions' in navigator)) {
        return 'unsupported';
    }

    const targetAddressSpace = baseUrl ? getTargetAddressSpace(baseUrl) : undefined;
    const permissionNames = targetAddressSpace
        ? [getPermissionName(targetAddressSpace)]
        : [
            'local-network' as PermissionName,
            'loopback-network' as PermissionName,
        ];

    let sawPrompt = false;

    for (const name of permissionNames) {
        try {
            const status = await navigator.permissions.query({ name });
            if (status.state === 'granted') {
                return 'granted';
            }
            if (status.state === 'denied') {
                return 'denied';
            }
            if (status.state === 'prompt') {
                sawPrompt = true;
            }
        } catch {
            continue;
        }
    }

    return sawPrompt ? 'prompt' : 'unsupported';
};

export const requestLocalNetworkAccess = async (baseUrl: string): Promise<LocalNetworkPermissionState> => {
    if (!import.meta.client) {
        return 'unsupported';
    }

    const targetAddressSpace = getTargetAddressSpace(baseUrl);
    if (!targetAddressSpace) {
        return 'unsupported';
    }

    const permission = await queryLocalNetworkPermission(baseUrl);
    if (permission === 'granted') {
        return 'granted';
    }

    const probeUrl = new URL('/todo-list', baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).href;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);

    try {
        await fetch(probeUrl, { targetAddressSpace, signal: controller.signal });
        return 'granted';
    } catch {
        const updatedPermission = await queryLocalNetworkPermission(baseUrl);
        return updatedPermission === 'unsupported' ? 'prompt' : updatedPermission;
    } finally {
        clearTimeout(timeoutId);
    }
};
