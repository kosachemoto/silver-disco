import React from 'react';
import { useNavigate } from 'react-router';

import '@/widgets/auth/ui/auth-code-request-form';
import { AuthLoginForm } from '@/widgets/auth/ui/auth-login-form';

import { useAuthLoginMutation } from '@/shared/api/auth/login/hooks';
import { useAlert } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';

import type { TAuthLogin } from '@/entities/auth/types';

export const AuthLogin: React.FC = () => {
    const { props, setError } = useAlert();
    const navigate = useNavigate();
    const authLoginMutation = useAuthLoginMutation();

    const authLogin = (data: TAuthLogin) => {
        authLoginMutation.mutate(data, {
            onSuccess: () => navigate('/auth/success'),
            onError: setError,
        });
    };

    return (
        <>
            <h1>Login</h1>
            {authLoginMutation.isError && <Alert {...props} />}
            <AuthLoginForm
                onSubmit={authLogin}
                isLoading={authLoginMutation.isPending}
            />
        </>
    );
};
