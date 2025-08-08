import type { TAuthLogin } from '@/entities/auth/types';

export const authLoginFetch = (data: TAuthLogin) => {
    return fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
