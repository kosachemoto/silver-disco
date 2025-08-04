import clsx from 'clsx';
import React from 'react';

import styles from './divider.module.css';

type TProps = {
    className?: string;
};

export const Divider: React.FC<React.PropsWithChildren<TProps>> = ({
    className,
    children,
}) => {
    return (
        <div className={clsx(styles.root, className)}>
            <span className={styles.label}>{children}</span>
        </div>
    );
};
