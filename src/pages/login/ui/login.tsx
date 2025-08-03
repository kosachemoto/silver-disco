import React from 'react';
import { Outlet } from 'react-router';

export const Login: React.FC = () => {
    return (
        <code style={{ backgroundColor: 'mediumseagreen' }}>
            login/
            <Outlet />
        </code>
    );
};
