import React from 'react';

import type { TProps } from '@/shared/ui/button';

type TButtonStatus = 'pending' | 'verifying' | 'resolved' | 'rejected';

type TOptions = {
    [key in TButtonStatus]?: TProps;
};

export const useButtonAsync = (
    defaultProps: TProps = {},
    options: TOptions = {}
) => {
    const {
        pending = {},
        verifying = {},
        resolved = {},
        rejected = {},
    } = options;
    const [props, setProps] = React.useState<TProps>(defaultProps);
    const patch = (...args: TProps[]) =>
        setProps((props) => Object.assign({}, props, ...args));

    const onPending = React.useCallback(
        () => patch({ isLoading: true }, pending),
        [pending]
    );

    const onVerifying = React.useCallback(
        () => patch({ isLoading: true }, verifying),
        [verifying]
    );

    const onError = React.useCallback(
        () => patch({ isLoading: false }, rejected),
        [rejected]
    );

    const onSuccess = React.useCallback(
        () => patch({ isLoading: false }, resolved),
        [resolved]
    );

    return {
        props,
        setProps,
        onPending,
        onVerifying,
        onSuccess,
        onError,
    };
};
