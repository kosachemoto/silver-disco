import type { TAuthSignInCodeResend } from '@/entities/auth/types';

export const authSignInCodeResendFetching = (data: TAuthSignInCodeResend) => {
    return fetch('/api/auth/code/resend', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
