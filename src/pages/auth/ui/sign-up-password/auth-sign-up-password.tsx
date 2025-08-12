import { useLocation, useRouter } from '@tanstack/react-router';
import React from 'react';

import {
    useAuthContinueButton,
    useAuthSignInPasskeyButton,
} from '@/pages/auth/hooks';

import { AuthSignUpPasswordForm } from '@/widgets/auth/ui/auth-sign-up-password-form';

import { useAuthSignInPasskeyMutation } from '@/shared/api/auth/sign-in/passkey/hooks';
import { useAuthSignUpPasswordRequestMutation } from '@/shared/api/auth/sign-up/password/request/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';

import type { TAuthSignUpPassword } from '@/entities/auth/types';

export const AuthSignUpPassword: React.FC = () => {
    const router = useRouter();
    const location = useLocation();
    const { email } = location.state;
    const { props: propsContinueButton, ...optionsContinueButton } =
        useAuthContinueButton();
    const { props: propsButtonPasskey, ...optionsButtonPasskey } =
        useAuthSignInPasskeyButton();
    const { queue, unshiftApiErorr } = useAlertManager();

    const authSignUpPasswordMutation = useAuthSignUpPasswordRequestMutation(
        optionsContinueButton
    );
    const signUpPassword = (data: TAuthSignUpPassword) => {
        authSignUpPasswordMutation.mutate(data, {
            onSuccess: () =>
                router.navigate({
                    to: '/auth/sign-up/verification',
                    state: {
                        email: data.email,
                        from: '/auth/sign-up/password',
                    },
                }),
            onError: unshiftApiErorr,
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
            <AuthSignUpPasswordForm
                onSubmit={signUpPassword}
                defaultValues={{ email }}
                propsButton={propsContinueButton}
                isLoading={authSignUpPasswordMutation.isPending}
            />
            <List>
                <List.Item>
                    <Link to="/auth/sign-up">Sing Up with email</Link>
                </List.Item>
                <List.Item>
                    <Link to="/auth/sign-up/passkey">Or Passkey</Link>
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
