import clsx from 'clsx';
import React from 'react';

import { Input } from '@/shared/ui/input';

import styles from './checkbox.module.css';

type TProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox: React.FC<React.PropsWithChildren<TProps>> = ({
    children,
    ...props
}) => {
    return (
        <label className={styles.wrapper}>
            <Input
                type="checkbox"
                {...props}
                className={clsx(styles.checkmark, props.className)}
            />
            {children}
        </label>
    );
};
