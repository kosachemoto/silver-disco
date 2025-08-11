import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthPasskeyButton } from '@/pages/auth/hooks';

import '@/widgets/auth/ui/auth-sign-in-form';
import { AuthSignInPasswordForm } from '@/widgets/auth/ui/auth-sign-in-password-form';

import { useAuthSignInPasskeyMutation } from '@/shared/api/auth/sign-in/passkey/hooks';
import { useAuthPasswordVerifyMutation } from '@/shared/api/auth/sign-in/password/verify/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';
import { convertApiErrorToProps } from '@/shared/utils/alert';

import type { ApiError } from '@/entities/api-error/utils';
import type { TAuthSignInPassword } from '@/entities/auth/types';
import { routes } from '@/entities/routes/utils';

export const AuthSignInPassword: React.FC = () => {
    const {
        props: propsButton,
        onStart,
        onSuccess,
        onError,
    } = useAuthPasskeyButton();
    const { queue, unshift } = useAlertManager({ variant: 'error' });
    const navigate = useNavigate();
    const authLoginMutation = useAuthPasswordVerifyMutation();
    const authPasskeyMutation = useAuthSignInPasskeyMutation();
    const unshiftApiErorr = (error: ApiError) => {
        unshift(convertApiErrorToProps(error));
    };

    const authPasskey = () => {
        onStart();
        authPasskeyMutation.mutate(undefined, {
            onSuccess: () => {
                onSuccess();
                navigate(routes.auth.success.path);
            },
            onError: (err) => {
                onError();
                unshiftApiErorr(err);
            },
        });
    };

    const authLogin = (data: TAuthSignInPassword) => {
        authLoginMutation.mutate(data, {
            onSuccess: () => navigate(routes.auth.success.path),
            onError: unshiftApiErorr,
        });
    };

    return (
        <>
            <h1>Sing In</h1>
            {queue.map(Alert)}
            <AuthSignInPasswordForm
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
                    <Link to={routes.auth['sign-up'].path}>Sing Up</Link>
                </List.Item>
                <List.Item>
                    <Link to={routes.auth['sign-in'].path}>
                        Sign In with email
                    </Link>
                </List.Item>
            </List>
        </>
    );
};
