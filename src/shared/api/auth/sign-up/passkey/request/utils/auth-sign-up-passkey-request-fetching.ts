import type { TAuthSignInCodeRequest } from '@/entities/auth/types/auth-sign-in-code-request';

export const authSignUpPasskeyRequestFetching = (
    data: TAuthSignInCodeRequest
) =>
    fetch('/api/auth/sign-up/passkey/request', {
        body: JSON.stringify(data),
        method: 'POST',
    });
