import type { TAuthSignInCodeRequest } from '@/entities/auth/types';

export const authCodeSignInRequestFetching = (
    data: TAuthSignInCodeRequest | undefined
) =>
    fetch('/api/auth/code/request', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
