import clsx from 'clsx';
import React from 'react';

import styles from './input.module.css';

type TProps = {
    ref?: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<TProps> = (props) => {
    return (
        <input
            tabIndex={0}
            {...props}
            className={clsx(styles.root, props.className)}
        />
    );
};
