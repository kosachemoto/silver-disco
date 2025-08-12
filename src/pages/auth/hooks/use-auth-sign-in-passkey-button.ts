import { useButtonAsync } from '@/shared/hooks/button';
import type { TProps } from '@/shared/ui/button';

export const useAuthSignInPasskeyButton = (defaultProps?: TProps) => {
    return useButtonAsync(
        {
            children: 'Continue with Passkey',
            ...defaultProps,
        },
        {
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
        }
    );
};
