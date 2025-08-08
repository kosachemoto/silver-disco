import React from 'react';

import type { ApiError } from '@/shared/api/utils';
import { Alert } from '@/shared/ui/alert';

type TProps = React.ComponentProps<typeof Alert>;

export const useAlert = (defaultProps?: TProps) => {
    const [props, setProps] = React.useState<TProps>({
        variant: 'error',
        ...defaultProps,
    });

    const setApiError = React.useCallback(({ message }: ApiError) => {
        setProps((props) => ({ ...props, children: message }));
    }, []);

    return {
        props,
        setProps,
        setApiError,
    };
};
