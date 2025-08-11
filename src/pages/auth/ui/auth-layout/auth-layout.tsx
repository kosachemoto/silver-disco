import { Outlet } from '@tanstack/react-router';
import React from 'react';

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
