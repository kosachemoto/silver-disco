import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthCodeRouteState } from '@/pages/auth/hooks';

import { AuthCodeRequestForm } from '@/widgets/auth/ui/auth-code-request-form';

import { useAuthCodeRequestMutation } from '@/shared/api/auth/code/request/hooks';

import type { TAuthCodeRequest } from '@/entities/auth/types';

export const AuthCodeRequest: React.FC = () => {
    const navigate = useNavigate();
    const { email } = useAuthCodeRouteState();
    const authCodeRequestMutation = useAuthCodeRequestMutation();
    const authCodeRequest = (data: TAuthCodeRequest) => {
        authCodeRequestMutation.mutateAsync(data).then(() => {
            navigate('/auth/code-verify', {
                state: { email: authCodeRequestMutation.variables?.email },
            });
        });
    };

    return (
        <>
            <h1>Login</h1>
            <AuthCodeRequestForm
                onSubmit={authCodeRequest}
                defaultValues={{ email }}
                isLoading={authCodeRequestMutation.isPending}
            />
        </>
    );
};
