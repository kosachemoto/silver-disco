import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthCodeRouteState } from '@/pages/auth/hooks';

import { AuthCodeRequestForm } from '@/widgets/auth/ui/auth-code-request-form';

import { useAuthCodeRequestMutation } from '@/shared/api/auth/code/request/hooks';
import { useAlert } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';

import type { TAuthCodeRequest } from '@/entities/auth/types';

export const AuthCodeRequest: React.FC = () => {
    const { props, setApiError } = useAlert();
    const navigate = useNavigate();
    const { email } = useAuthCodeRouteState();
    const authCodeRequestMutation = useAuthCodeRequestMutation();
    const authCodeRequest = (data: TAuthCodeRequest) => {
        authCodeRequestMutation.mutate(data, {
            onSuccess: () => {
                navigate('/auth/code-verify', {
                    state: { email: data.email },
                });
            },
            onError: setApiError,
        });
    };

    return (
        <>
            <h1>Login</h1>
            {authCodeRequestMutation.isError && <Alert {...props} />}
            <AuthCodeRequestForm
                onSubmit={authCodeRequest}
                defaultValues={{ email }}
                isLoading={authCodeRequestMutation.isPending}
            />
        </>
    );
};
