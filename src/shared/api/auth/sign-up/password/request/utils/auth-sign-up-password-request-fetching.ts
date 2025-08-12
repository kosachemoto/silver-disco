import type { TAuthSignUpPassword } from '@/entities/auth/types';

export const authSignUpPasswordRequestFetching = (
    data: TAuthSignUpPassword
) => {
    return fetch('/api/auth/sign-up/password/request', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
