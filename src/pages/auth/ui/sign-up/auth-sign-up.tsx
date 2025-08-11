import React from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

import { useAuthCodeRouteState } from '@/pages/auth/hooks';

import { AuthSignUpForm } from '@/widgets/auth/ui/auth-sign-up-form';

import { useAuthSignInCodeRequestMutation } from '@/shared/api/auth/sign-in/code/request/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';
import { convertApiErrorToProps } from '@/shared/utils/alert';

import type { TAuthSignUp } from '@/entities/auth/types';
import { routes } from '@/entities/routes/utils';

export const AuthSignUp: React.FC = () => {
    const location = useLocation();
    const { email } = useAuthCodeRouteState();
    const { queue, unshift } = useAlertManager();
    const navigate = useNavigate();
    const authCodeRequestMutation = useAuthSignInCodeRequestMutation();
    const authCodeRequest = (data: TAuthSignUp) => {
        authCodeRequestMutation.mutate(data, {
            onSuccess: () => {
                navigate(routes.auth['sign-up']['verification'].path, {
                    state: { email: data.email, from: location.pathname },
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
                    <Link to={routes['auth']['sign-up-passkey'].path}>
                        Sing Up with passkey
                    </Link>
                </List.Item>
            </List>
            <Divider>already have an account?</Divider>
            <List>
                <List.Item>
                    <Link to={routes['auth']['sign-in'].path}>
                        Sign In with Email
                    </Link>
                </List.Item>
                <List.Item>
                    <Link to={routes['auth']['sign-in'].password.path}>
                        Or Password
                    </Link>
                </List.Item>
            </List>
        </>
    );
};
