import { useButtonAsync } from '@/shared/hooks/button';
import type { TProps } from '@/shared/ui/button';

export const useAuthSignInPasskeyButton = (defaultProps?: TProps) => {
    return useButtonAsync(
        {
            children: 'Sign In with Passkey',
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
                children: 'Success',
            },
            rejected: {
                children: 'Try again with Passkey',
            },
        }
    );
};
