import React from 'react';

import type { TError } from '@/shared/api/types';
import { Alert } from '@/shared/ui/alert';

type TProps = React.ComponentProps<typeof Alert>;

export const useAlert = (defaultProps?: TProps) => {
    const [props, setProps] = React.useState<TProps>({
        variant: 'error',
        ...defaultProps,
    });

    const setError = React.useCallback(({ message }: TError) => {
        setProps((props) => ({ ...props, children: message }));
    }, []);

    return {
        props,
        setProps,
        setError,
    };
};
