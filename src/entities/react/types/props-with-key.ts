import type React from 'react';

export type TPropsWithKey<P = unknown> = P & {
    key?: React.Key;
};
