import clsx from 'clsx';
import React from 'react';

import styles from './alert.module.css';

export const Alert: React.FC<
    React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => {
    return (
        <div {...props} className={clsx(styles.root, props.className)}>
            {children}
        </div>
    );
};
