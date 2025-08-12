import type { TAuthCodeVerify } from '@/entities/auth/types';

export const authCodeVerifyFetching = (data: TAuthCodeVerify) => {
    return fetch('/api/auth/code/verify', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
