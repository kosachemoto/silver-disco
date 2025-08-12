import { useLocation, useRouter } from '@tanstack/react-router';
import React from 'react';

import {
    useAuthSignInPasskeyButton,
    useAuthSignUpPasskeyButton,
} from '@/pages/auth/hooks';

import { AuthSignUpPasskeyForm } from '@/widgets/auth/ui/auth-sign-up-passkey-form';

import { useAuthSignInPasskeyMutation } from '@/shared/api/auth/sign-in/passkey/hooks';
import { useAuthSignUpPasskeyMutation } from '@/shared/api/auth/sign-up/passkey/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Divider } from '@/shared/ui/divider';
import { Link } from '@/shared/ui/link';
import { List } from '@/shared/ui/list';
import { convertApiErrorToProps } from '@/shared/utils/alert';

import type { ApiError } from '@/entities/api-error/utils';
import type { TAuthSignUpPasskey } from '@/entities/auth/types';

export const AuthSignUpPasskey: React.FC = () => {
    const router = useRouter();
    const { props: propsSignUpButton, ...optionsSignUpButton } =
        useAuthSignUpPasskeyButton();
    const { props: propsButtonPasskey, ...optionsButtonPasskey } =
        useAuthSignInPasskeyButton();
    const location = useLocation();
    const { email } = location.state;
    const { queue, unshift } = useAlertManager();
    const unshiftApiErorr = (error: ApiError) => {
        unshift(convertApiErrorToProps(error));
    };

    const authSignUpPasskeyMutation =
        useAuthSignUpPasskeyMutation(optionsSignUpButton);
    const signUpPasskey = (data: TAuthSignUpPasskey) => {
        authSignUpPasskeyMutation.mutate(data, {
            onSuccess: () => router.navigate({ to: '/auth/success' }),
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
            <AuthSignUpPasskeyForm
                onSubmit={signUpPasskey}
                defaultValues={{ email }}
                propsButton={propsSignUpButton}
                isLoading={authSignUpPasskeyMutation.isPending}
            />
            <List>
                <List.Item>
                    <Link to="/auth/sign-up">Sing Up with email</Link>
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
