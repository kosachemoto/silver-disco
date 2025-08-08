import type { TAuthCodeRequest } from '@/entities/auth/types';

export const authCodeRequestFetch = (data: TAuthCodeRequest | undefined) => {
    if (!data) {
        return Promise.reject(Response.error());
    }

    return fetch('/api/auth/code/request', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
