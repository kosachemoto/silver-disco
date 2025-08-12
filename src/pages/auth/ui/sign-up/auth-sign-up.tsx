import { useLocation, useRouter } from '@tanstack/react-router';
import React from 'react';

import {
    useAuthContinueButton,
    useAuthSignInPasskeyButton,
} from '@/pages/auth/hooks';

import { AuthSignUpForm } from '@/widgets/auth/ui/auth-sign-up-form';

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
import type { TAuthSignUp } from '@/entities/auth/types';

export const AuthSignUp: React.FC = () => {
    const router = useRouter();
    const location = useLocation();
    const { email } = location.state;
    const { queue, unshift } = useAlertManager();
    const unshiftApiErorr = (error: ApiError) => {
        unshift(convertApiErrorToProps(error));
    };

    const { props: propsButtonContinue, ...optionsButtonContinue } =
        useAuthContinueButton();
    const { props: propsButtonPasskey, ...optionsButtonPasskey } =
        useAuthSignInPasskeyButton();
    const authCodeRequestMutation = useAuthSignInCodeRequestMutation(
        optionsButtonContinue
    );
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

    const authPasskeyMutation =
        useAuthSignInPasskeyMutation(optionsButtonPasskey);
    const authPasskey = () =>
        authPasskeyMutation.mutate(undefined, {
            onSuccess: () => router.navigate({ to: '/auth/success' }),
            onError: unshiftApiErorr,
        });

    return (
        <>
            <h1>Sign Up</h1>
            {queue.map(Alert)}
            <AuthSignUpForm
                onSubmit={authCodeRequest}
                defaultValues={{ email }}
                propsButton={propsButtonContinue}
                isLoading={authCodeRequestMutation.isPending}
            />
            <List>
                <List.Item>
                    <Link to="/auth/sign-up/passkey">Sing Up with passkey</Link>
                </List.Item>
            </List>
            <Divider>already have an account?</Divider>
            <Button
                variant="secondary"
                onClick={authPasskey}
                {...propsButtonPasskey}
            />
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
