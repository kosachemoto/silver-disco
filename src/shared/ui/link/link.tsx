import clsx from 'clsx';
import React from 'react';
import { Link as _Link } from 'react-router';
import type { LinkProps } from 'react-router';

import styles from './link.module.css';

export const Link: React.FC<LinkProps> = (props) => {
    return <_Link {...props} className={clsx(styles.root, props.className)} />;
};
