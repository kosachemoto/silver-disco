import React from 'react';

import { Alert } from '@/shared/ui/alert';
import { Link } from '@/shared/ui/link';

export const AuthSuccess: React.FC = () => {
    return (
        <>
            <h1>Success</h1>
            <Alert variant="success">You've done it! Congratulations</Alert>
            <p>Take a look on other flows if you haven't done it yet</p>
            <Link to="/auth">Get back</Link>
        </>
    );
};
