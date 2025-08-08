import React from 'react';

import { Button } from '@/shared/ui/button';

type TProps = React.ComponentProps<typeof Button>;

export const useAuthPasskeyButton = (defaultProps?: TProps) => {
    const [props, setProps] = React.useState<TProps>({
        children: 'Continue with Passkey',
        ...defaultProps,
    });

    const onStart = React.useCallback(() => {
        setProps((props) => ({
            ...props,
            isLoading: true,
            children: 'Pending...',
        }));
    }, []);

    const onError = React.useCallback(() => {
        setProps((props) => ({
            ...props,
            isLoading: false,
            children: 'Retry with passkey',
        }));
    }, []);

    const onSuccess = React.useCallback(() => {
        setProps((props) => ({
            ...props,
            isLoading: false,
            children: 'Success',
        }));
    }, []);

    return {
        props,
        setProps,
        onStart,
        onSuccess,
        onError,
    };
};
