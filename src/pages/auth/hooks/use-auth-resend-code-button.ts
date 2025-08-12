import { useButtonAsync } from '@/shared/hooks/button';
import type { TProps } from '@/shared/ui/button';

export const useAuthResendCodeButton = (defaultProps?: TProps) =>
    useButtonAsync(
        {
            children: 'Send a new one',
            ...defaultProps,
        },
        {
            pending: {
                children: 'Sending...',
            },
            resolved: {
                children: 'Send again',
            },
            rejected: {
                children: 'Retry sending',
            },
        }
    );
