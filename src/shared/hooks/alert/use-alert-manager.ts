import React from 'react';

import { Alert } from '@/shared/ui/alert';

import type { TPropsWithKey } from '@/entities/react/types';

type TProps = React.ComponentProps<typeof Alert>;

type TOptions = {
    limit?: number;
};

export const useAlertManager = (
    defaultProps: TProps = {},
    options?: TOptions
) => {
    const { limit = 1 } = options || {};
    const [queue, setQueue] = React.useState<TPropsWithKey<TProps>[]>([]);

    const unshift = React.useCallback(
        (props: TProps) => {
            setQueue((queue) =>
                [
                    { ...defaultProps, ...props, key: crypto.randomUUID() },
                    ...queue,
                ].slice(0, limit)
            );
        },
        [defaultProps, limit]
    );

    return {
        queue,
        unshift,
    };
};
