import { useButtonAsync } from '@/shared/hooks/button';
import type { TProps } from '@/shared/ui/button';

export const useAuthSignInPasskeyButton = (defaultProps?: TProps) => {
    return useButtonAsync(defaultProps, {
        idle: {
            children: 'Continue with Passkey',
        },
        pending: {
            children: 'Pending...',
        },
        verifying: {
            children: 'Verifying...',
        },
        resolved: {
            children: 'Retry with Passkey',
        },
        rejected: {
            children: 'Success',
        },
    });
};
