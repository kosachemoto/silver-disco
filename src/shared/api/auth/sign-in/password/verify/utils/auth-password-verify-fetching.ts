import type { TAuthSignInPassword } from '@/entities/auth/types';

export const authPasswordVerifyFetching = (data: TAuthSignInPassword) => {
    return fetch('/api/auth/password/verify', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
