import React from 'react';
import { Outlet } from 'react-router';

export const Root: React.FC = () => {
    return (
        <code style={{ backgroundColor: 'indianred' }}>
            /<Outlet />
        </code>
    );
};
