import React from 'react';

import { toReactNode } from '@/entities/react/utils';

import styles from './field.module.css';

type TProps = {
    title?: React.ComponentType | React.ReactNode;
    input?: React.ComponentType | React.ReactNode;
    error?: React.ComponentType | React.ReactNode;
};

export const Field: React.FC<TProps> = ({ title, input, error }) => {
    return (
        <div>
            <label className={styles.label}>
                <span className={styles.title}>{toReactNode(title)}</span>
                {toReactNode(input)}
            </label>
            {error && <p className={styles.error}>{toReactNode(error)}</p>}
        </div>
    );
};
