import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthCodeRouteState } from '@/pages/auth/hooks';
import { useAuthPasskeyButton } from '@/pages/auth/hooks';

import { AuthSignUpPasskeyForm } from '@/widgets/auth/ui/auth-sign-up-passkey-form';

import { useAuthSignUpPasskeyMutation } from '@/shared/api/auth/sign-up/passkey/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';
import { convertApiErrorToProps } from '@/shared/utils/alert';

import type { TAuthSignUpPasskey } from '@/entities/auth/types';

export const AuthSignUpPasskey: React.FC = () => {
    const {
        props: propsButton,
        onStart,
        onSuccess,
        onError,
    } = useAuthPasskeyButton();
    const { email } = useAuthCodeRouteState();
    const { queue, unshift } = useAlertManager();
    const navigate = useNavigate();
    const authSignUpPasskeyMutation = useAuthSignUpPasskeyMutation();
    const signUpPasskey = (data: TAuthSignUpPasskey) => {
        onStart();
        authSignUpPasskeyMutation.mutate(data, {
            onSuccess: () => {
                onSuccess();
                navigate('/auth/success');
            },
            onError: (error) => {
                onError();
                unshift(convertApiErrorToProps(error));
            },
        });
    };

    return (
        <>
            <h1>Sign Up</h1>
            {queue.map(Alert)}
            <AuthSignUpPasskeyForm
                onSubmit={signUpPasskey}
                defaultValues={{ email }}
                propsButton={propsButton}
                isLoading={authSignUpPasskeyMutation.isPending}
            />
            <List>
                <List.Item>
                    <Link to="/auth/sign-up">Sing Up with email</Link>
                </List.Item>
            </List>
            <Divider>already have an account?</Divider>
            <List>
                <List.Item>
                    <Link to="/auth/sing-in">Sign In with Email</Link>
                </List.Item>
                <List.Item>
                    <Link to="/auth/sign-in/password">Or Password</Link>
                </List.Item>
            </List>
        </>
    );
};
