import type { TAuthCodeRequest } from '@/entities/auth/types/auth-code-request';

export const authSignUpPasskeyRequestFetching = (data: TAuthCodeRequest) =>
    fetch('/api/auth/sign-up/passkey/request', {
        body: JSON.stringify(data),
        method: 'POST',
    });
