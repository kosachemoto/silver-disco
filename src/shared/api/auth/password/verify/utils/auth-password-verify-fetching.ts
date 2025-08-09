import type { TAuthLogin } from '@/entities/auth/types';

export const authPasswordVerifyFetching = (data: TAuthLogin) => {
    return fetch('/api/auth/password/verify', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
