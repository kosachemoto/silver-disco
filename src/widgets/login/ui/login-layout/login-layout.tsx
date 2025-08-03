import React from 'react';
import { Outlet } from 'react-router';

import styles from './login-layout.module.css';

export const LoginLayout: React.FC = () => {
    return (
        <section className={styles.root}>
            <Outlet />
        </section>
    );
};
