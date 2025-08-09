import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthPasskeyButton } from '@/pages/auth/hooks';
import { useAuthCodeRouteState } from '@/pages/auth/hooks';

import { AuthCodeRequestForm } from '@/widgets/auth/ui/auth-code-request-form';

import { useAuthCodeRequestMutation } from '@/shared/api/auth/code/request/hooks';
import { useAuthPasskeyMutation } from '@/shared/api/auth/passkey/hooks';
import { useAlert } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';

import type { TAuthCodeRequest } from '@/entities/auth/types';

export const AuthCodeRequest: React.FC = () => {
    const { email } = useAuthCodeRouteState();
    const {
        props: propsButton,
        onStart,
        onSuccess,
        onError,
    } = useAuthPasskeyButton();
    const { props: propsAlert, setApiError } = useAlert();
    const navigate = useNavigate();
    const authCodeRequestMutation = useAuthCodeRequestMutation();
    const authPasskeyMutation = useAuthPasskeyMutation();
    const authCodeRequest = (data: TAuthCodeRequest) => {
        authCodeRequestMutation.mutate(data, {
            onSuccess: () => {
                navigate('/auth/sign-in/code-verification', {
                    state: { email: data.email },
                });
            },
            onError: setApiError,
        });
    };

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

    return (
        <>
            <h1>Login</h1>
            {authCodeRequestMutation.isError && <Alert {...propsAlert} />}
            <AuthCodeRequestForm
                onSubmit={authCodeRequest}
                defaultValues={{ email }}
                isLoading={authCodeRequestMutation.isPending}
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
                    <Link to="/auth/sign-in/password">
                        Sign In with password
                    </Link>
                </List.Item>
            </List>
        </>
    );
};
