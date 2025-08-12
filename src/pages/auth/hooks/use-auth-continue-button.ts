import { useButtonAsync } from '@/shared/hooks/button';
import type { TProps } from '@/shared/ui/button';

export const useAuthContinueButton = (defaultProps?: TProps) =>
    useButtonAsync(
        {
            children: 'Continue',
            ...defaultProps,
        },
        {
            pending: {
                children: 'Pending...',
            },
            rejected: {
                children: 'Retry',
            },
            resolved: {
                children: 'Success',
            },
        }
    );
