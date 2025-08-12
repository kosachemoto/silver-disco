import { useLocation, useRouter } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import React from 'react';

import { useAuthSignInPasskeyButton } from '@/pages/auth/hooks';

import { AuthSignInForm } from '@/widgets/auth/ui/auth-sign-in-form';

import { useAuthSignInCodeRequestMutation } from '@/shared/api/auth/sign-in/code/request/hooks';
import { useAuthSignInPasskeyMutation } from '@/shared/api/auth/sign-in/passkey/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';
import { convertApiErrorToProps } from '@/shared/utils/alert';

import type { ApiError } from '@/entities/api-error/utils';
import type { TAuthSignInCodeRequest } from '@/entities/auth/types';

export const AuthSignIn: React.FC = () => {
    const router = useRouter();
    const location = useLocation();
    const { email } = location.state;
    const {
        props: propsButton,
        onPending,
        onVerifying,
        onSuccess,
        onError,
    } = useAuthSignInPasskeyButton();
    const { queue, unshift } = useAlertManager({ variant: 'error' });
    const authCodeRequestMutation = useAuthSignInCodeRequestMutation();
    const authPasskeyMutation = useAuthSignInPasskeyMutation({
        onPending,
        onVerifying,
        onSuccess,
        onError,
    });
    const unshiftApiErorr = (error: ApiError) => {
        unshift(convertApiErrorToProps(error));
    };

    const authCodeRequest = (data: TAuthSignInCodeRequest) => {
        authCodeRequestMutation.mutate(data, {
            onSuccess: () => {
                router.navigate({
                    to: '/auth/sign-in/verification',
                    state: { email: data.email, from: '/auth/sign-in' },
                });
            },
            onError: unshiftApiErorr,
        });
    };

    const authPasskey = () =>
        authPasskeyMutation.mutate(undefined, {
            onSuccess: () => router.navigate({ to: '/auth/success' }),
            onError: unshiftApiErorr,
        });

    return (
        <>
            <h1>Sing In</h1>
            {queue.map(Alert)}
            <AuthSignInForm
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
            <Outlet />
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
