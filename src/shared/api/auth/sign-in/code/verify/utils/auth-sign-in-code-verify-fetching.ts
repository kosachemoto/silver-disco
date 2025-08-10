import type { TAuthSignInCodeVerify } from '@/entities/auth/types';

export const authSignInCodeVerifyFetching = (data: TAuthSignInCodeVerify) => {
    return fetch('/api/auth/code/verify', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
