export const API_CONNECTION_ERROR_MESSAGE =
    'Die API-URL ist ungültig oder nicht erreichbar. Bitte überprüfe deine Einstellungen.';

export const isApiConnectionError = (error: unknown): boolean => {
    if (!error) {
        return false;
    }

    if (error instanceof TypeError || error instanceof DOMException) {
        return true;
    }

    if (typeof error !== 'object') {
        return false;
    }

    const fetchError = error as {
        name?: string;
        message?: string;
        statusCode?: number;
        cause?: unknown;
    };

    if (fetchError.name === 'AbortError' || fetchError.name === 'TimeoutError') {
        return true;
    }

    if (fetchError.statusCode !== undefined && fetchError.statusCode > 0) {
        return false;
    }

    if (fetchError.statusCode === 0) {
        return true;
    }

    const message = fetchError.message?.toLowerCase() ?? '';
    if (
        message.includes('failed to fetch')
        || message.includes('network')
        || message.includes('fetch failed')
        || message.includes('connection refused')
        || message.includes('econnrefused')
        || message.includes('enotfound')
        || message.includes('networkerror')
        || message.includes('<no response>')
        || message.includes('timeout')
        || message.includes('timed out')
        || message.includes('aborted')
    ) {
        return true;
    }

    if (fetchError.cause && isApiConnectionError(fetchError.cause)) {
        return true;
    }

    return false;
};
