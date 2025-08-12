import { useRouter } from '@tanstack/react-router';
import React from 'react';

import {
    useAuthContinueButton,
    useAuthSignInPasskeyButton,
} from '@/pages/auth/hooks';

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

import type { TAuthSignInPassword } from '@/entities/auth/types';

export const AuthSignInPassword: React.FC = () => {
    const router = useRouter();
    const { props: propsContinueButton, ...optionsContinueButton } =
        useAuthContinueButton();
    const { props: propsButton, ...optionsSignInPasskeyButton } =
        useAuthSignInPasskeyButton();
    const { queue, unshiftApiErorr } = useAlertManager({ variant: 'error' });
    const authLoginMutation = useAuthPasswordVerifyMutation(
        optionsContinueButton
    );
    const authPasskeyMutation = useAuthSignInPasskeyMutation(
        optionsSignInPasskeyButton
    );

    const authPasskey = () =>
        authPasskeyMutation.mutate(undefined, {
            onSuccess: () => router.navigate({ to: '/auth/success' }),
            onError: unshiftApiErorr,
        });

    const authLogin = (data: TAuthSignInPassword) => {
        authLoginMutation.mutate(data, {
            onSuccess: () => router.navigate({ to: '/auth/success' }),
            onError: unshiftApiErorr,
        });
    };

    return (
        <>
            <h1>Sing In</h1>
            {queue.map(Alert)}
            <AuthSignInPasswordForm
                onSubmit={authLogin}
                propsButton={propsContinueButton}
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
                    <Link to="/auth/sign-up">Sing Up</Link>
                </List.Item>
                <List.Item>
                    <Link to="/auth/sign-in">Sign In with email</Link>
                </List.Item>
            </List>
        </>
    );
};
