import React from 'react';
import { Outlet } from 'react-router';

import styles from './root-layout.module.css';

export const RootLayout: React.FC = () => {
    return (
        <main className={styles.root}>
            <Outlet />
        </main>
    );
};
