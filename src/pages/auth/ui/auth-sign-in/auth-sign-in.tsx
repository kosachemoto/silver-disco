import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthPasskeyButton } from '@/pages/auth/hooks';
import { useAuthCodeRouteState } from '@/pages/auth/hooks';

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
import { routes } from '@/entities/routes/utils';

export const AuthSignIn: React.FC = () => {
    const { email } = useAuthCodeRouteState();
    const {
        props: propsButton,
        onStart,
        onSuccess,
        onError,
    } = useAuthPasskeyButton();
    const { queue, unshift } = useAlertManager({ variant: 'error' });
    const navigate = useNavigate();
    const authCodeRequestMutation = useAuthSignInCodeRequestMutation();
    const authPasskeyMutation = useAuthSignInPasskeyMutation();
    const unshiftApiErorr = (error: ApiError) => {
        unshift(convertApiErrorToProps(error));
    };

    const authCodeRequest = (data: TAuthSignInCodeRequest) => {
        authCodeRequestMutation.mutate(data, {
            onSuccess: () => {
                navigate(routes.auth['sign-in']['verification'].path, {
                    state: { email: data.email },
                });
            },
            onError: unshiftApiErorr,
        });
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
            <List>
                <List.Item>
                    <Link to={routes.auth['sign-up'].path}>Sing Up</Link>
                </List.Item>
                <List.Item>
                    <Link to={routes.auth['sign-in'].password.path}>
                        Sign In with password
                    </Link>
                </List.Item>
            </List>
        </>
    );
};
