import clsx from 'clsx';
import React from 'react';

import styles from './alert.module.css';

type TProps = {
    variant?: 'error' | 'warn' | 'success';
} & React.HTMLAttributes<HTMLDivElement>;

export const Alert: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    variant = 'error',
    ...props
}) => {
    return (
        <div
            {...props}
            className={clsx(
                styles.root,
                {
                    [styles.root_error]: variant === 'error',
                    [styles.root_warn]: variant === 'warn',
                    [styles.root_success]: variant === 'success',
                },
                props.className
            )}
        >
            {children}
        </div>
    );
};
