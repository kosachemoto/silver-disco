import clsx from 'clsx';
import React from 'react';

import styles from './button.module.css';

type TProps = {
    variant?: 'primary' | 'secondary';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    variant = 'primary',
    ...props
}) => {
    return (
        <button
            {...props}
            className={clsx(
                styles.root,
                { [styles.root_secondary]: variant === 'secondary' },
                props.className
            )}
        >
            {children}
        </button>
    );
};
