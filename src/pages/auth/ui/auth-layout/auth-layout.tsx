import React from 'react';
import { Outlet } from 'react-router';

import styles from './auth-layout.module.css';

export const AuthLayout: React.FC = () => {
    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <Outlet />
            </section>
        </main>
    );
};
