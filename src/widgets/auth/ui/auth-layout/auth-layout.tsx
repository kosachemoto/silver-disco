import React from 'react';
import { Outlet } from 'react-router';

import styles from './auth-layout.module.css';

export const AuthLayout: React.FC = () => {
    return (
        <section className={styles.root}>
            <Outlet />
        </section>
    );
};
