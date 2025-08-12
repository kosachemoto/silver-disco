import { useButtonAsync } from '@/shared/hooks/button';
import type { TProps } from '@/shared/ui/button';

export const useAuthVerifyCodeButton = (defaultProps?: TProps) =>
    useButtonAsync(
        {
            children: 'Verify',
            ...defaultProps,
        },
        {
            pending: {
                children: 'Checking...',
            },
            rejected: {
                children: 'Verify again',
            },
            resolved: {
                children: 'All set',
            },
        }
    );
