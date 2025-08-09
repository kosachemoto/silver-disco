import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthPasskeyButton } from '@/pages/auth/hooks';

import '@/widgets/auth/ui/auth-code-request-form';
import { AuthLoginForm } from '@/widgets/auth/ui/auth-login-form';

import { useAuthPasskeyMutation } from '@/shared/api/auth/passkey/hooks';
import { useAuthPasswordVerifyMutation } from '@/shared/api/auth/password/verify/hooks';
import { useAlert } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';

import type { TAuthLogin } from '@/entities/auth/types';

export const AuthSignInPassword: React.FC = () => {
    const {
        props: propsButton,
        onStart,
        onSuccess,
        onError,
    } = useAuthPasskeyButton();
    const { props: propsAlert, setApiError } = useAlert();
    const navigate = useNavigate();
    const authLoginMutation = useAuthPasswordVerifyMutation();
    const authPasskeyMutation = useAuthPasskeyMutation();

    const authPasskey = () => {
        onStart();
        authPasskeyMutation.mutate(undefined, {
            onSuccess: () => {
                onSuccess();
                navigate('/auth/success');
            },
            onError: (err) => {
                onError();
                setApiError(err);
            },
        });
    };

    const authLogin = (data: TAuthLogin) => {
        authLoginMutation.mutate(data, {
            onSuccess: () => navigate('/auth/success'),
            onError: setApiError,
        });
    };

    return (
        <>
            <h1>Login</h1>
            {authLoginMutation.isError && <Alert {...propsAlert} />}
            <AuthLoginForm
                onSubmit={authLogin}
                isLoading={authLoginMutation.isPending}
            />
            <Divider>or</Divider>
            <Button
                variant="secondary"
                onClick={authPasskey}
                {...propsButton}
            />
            <List>
                <List.Item>
                    <Link to="/auth/sign-up">Sing Up</Link>
                </List.Item>
                <List.Item>
                    <Link to="/auth/sign-in">Sign In with email</Link>
                </List.Item>
            </List>
        </>
    );
};
