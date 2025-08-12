import { useButtonAsync } from '@/shared/hooks/button';
import type { TProps } from '@/shared/ui/button';

export const useAuthSignUpPasskeyButton = (defaultProps?: TProps) =>
    useButtonAsync(defaultProps, {
        idle: {
            children: 'Sign up with Passkey',
        },
        pending: {
            children: 'Pending...',
        },
        verifying: {
            children: 'Verifying...',
        },
        rejected: {
            children: 'Retry wiht Passkey',
        },
        resolved: {
            children: 'Success',
        },
    });
