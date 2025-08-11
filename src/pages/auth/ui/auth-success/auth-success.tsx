import React from 'react';

import { Alert } from '@/shared/ui/alert';
import { Link } from '@/shared/ui/link';

import { routes } from '@/entities/routes/utils';

export const AuthSuccess: React.FC = () => {
    return (
        <>
            <h1>Success</h1>
            <Alert variant="success">You've done it!</Alert>
            <p>Check out the other flows if you haven’t already</p>
            <Link to={routes['auth'].path}>Get back</Link>
        </>
    );
};
