import { Link as _Link } from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import clsx from 'clsx';
import React from 'react';

import styles from './link.module.css';

type TProps = LinkProps & {
    className?: string;
};

export const Link: React.FC<TProps> = (props) => {
    return (
        <_Link
            tabIndex={0}
            {...props}
            className={clsx(styles.root, props.className)}
        />
    );
};
