import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthCodeRouteState } from '@/pages/auth/hooks';

import { AuthSignUpForm } from '@/widgets/auth/ui/auth-sign-up-form';

import { useAuthCodeRequestMutation } from '@/shared/api/auth/code/request/hooks';
import { useAlert } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';

import type { TAuthSignUp } from '@/entities/auth/types';

export const AuthSignUp: React.FC = () => {
    const { email } = useAuthCodeRouteState();
    const { props: propsAlert, setApiError } = useAlert();
    const navigate = useNavigate();
    const authCodeRequestMutation = useAuthCodeRequestMutation();
    const authCodeRequest = (data: TAuthSignUp) => {
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
            <h1>Sign Up</h1>
            {authCodeRequestMutation.isError && <Alert {...propsAlert} />}
            <AuthSignUpForm
                onSubmit={authCodeRequest}
                defaultValues={{ email }}
                isLoading={authCodeRequestMutation.isPending}
            />
            <Divider>already have an account?</Divider>
            <List>
                <List.Item>
                    <Link to="/auth/code-request">Sign In with Email</Link>
                </List.Item>
                <List.Item>
                    <Link to="/auth/login">Or Password</Link>
                </List.Item>
            </List>
        </>
    );
};
