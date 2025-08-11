import { useLocation, useRouter } from '@tanstack/react-router';
import React from 'react';

import { AuthSignUpForm } from '@/widgets/auth/ui/auth-sign-up-form';

import { useAuthSignInCodeRequestMutation } from '@/shared/api/auth/sign-in/code/request/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';
import { convertApiErrorToProps } from '@/shared/utils/alert';

import type { TAuthSignUp } from '@/entities/auth/types';

export const AuthSignUp: React.FC = () => {
    const router = useRouter();
    const location = useLocation();
    const { email } = location.state;
    const { queue, unshift } = useAlertManager();
    const authCodeRequestMutation = useAuthSignInCodeRequestMutation();
    const authCodeRequest = (data: TAuthSignUp) => {
        authCodeRequestMutation.mutate(data, {
            onSuccess: () => {
                router.navigate({
                    to: '/auth/sign-up/verification',
                    state: {
                        email: data.email,
                        from: '/auth/sign-up',
                    },
                });
            },
            onError: (error) => unshift(convertApiErrorToProps(error)),
        });
    };

    return (
        <>
            <h1>Sign Up</h1>
            {queue.map(Alert)}
            <AuthSignUpForm
                onSubmit={authCodeRequest}
                defaultValues={{ email }}
                isLoading={authCodeRequestMutation.isPending}
            />
            <List>
                <List.Item>
                    <Link to="/auth/sign-up/passkey">Sing Up with passkey</Link>
                </List.Item>
            </List>
            <Divider>already have an account?</Divider>
            <List>
                <List.Item>
                    <Link to="/auth/sign-in">Sign In with Email</Link>
                </List.Item>
                <List.Item>
                    <Link to="/auth/sign-in/password">Or Password</Link>
                </List.Item>
            </List>
        </>
    );
};
