import clsx from 'clsx';
import React from 'react';

import { ReactComponent as Loader } from '@/assets/svg/loader.svg';

import styles from './button.module.css';

type TProps = {
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    isLoading,
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
            {isLoading && <Loader className={styles.loader} fill="orange" />}
            {children}
        </button>
    );
};
