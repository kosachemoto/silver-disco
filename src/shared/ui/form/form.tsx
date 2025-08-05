import clsx from 'clsx';
import React from 'react';

import styles from './form.module.css';

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = (
    props
) => {
    return <form {...props} className={clsx(styles.root, props.className)} />;
};
