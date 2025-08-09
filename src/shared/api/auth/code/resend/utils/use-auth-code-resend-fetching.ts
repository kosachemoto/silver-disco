import type { TAuthCodeResend } from '@/entities/auth/types';

export const authCodeResendFetching = (data: TAuthCodeResend) => {
    return fetch('/api/auth/code/resend', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
};
