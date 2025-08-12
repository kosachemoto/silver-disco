import { useLocation, useRouter } from '@tanstack/react-router';
import React from 'react';

import {
    useAuthResendCodeButton,
    useAuthVerifyCodeButton,
} from '@/pages/auth/hooks';

import { AuthSignInVerifyForm } from '@/widgets/auth/ui/auth-sign-in-verification-form';

import { EmailLink } from '@/features/email/ui';

import { useAuthSignInCodeResendMutation } from '@/shared/api/auth/sign-in/code/resend/hooks';
import { useAuthSignInCodeVerifyMutation } from '@/shared/api/auth/sign-in/code/verify/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Link } from '@/shared/ui/link';

import type { TAuthSignInCodeVerify } from '@/entities/auth/types';

export const AuthSignInVerify: React.FC = () => {
    const router = useRouter();
    const location = useLocation();
    const { email, from } = location.state;
    const { queue, unshiftApiErorr } = useAlertManager();
    const { props: propsVerifyCodeButton, ...optionsVerifyCodeButton } =
        useAuthVerifyCodeButton();
    const { props: propsResendCodeButton, ...optionsResendCodeButton } =
        useAuthResendCodeButton();
    const mutationVerify = useAuthSignInCodeVerifyMutation(
        optionsVerifyCodeButton
    );
    const mutationResend = useAuthSignInCodeResendMutation(
        optionsResendCodeButton
    );

    if (!email) {
        return (
            <>
                <h1>Verification</h1>
                <Alert>Unexpected error</Alert>
                <div>{from && <Link to={from}>Get back</Link>}</div>
            </>
        );
    }

    const authCodeVerify = (data: TAuthSignInCodeVerify) => {
        mutationVerify.mutate(data, {
            onSuccess: () => {
                router.navigate({ to: '/auth/success' });
            },
            onError: unshiftApiErorr,
        });
    };

    const authCodeResend = () => {
        mutationResend.mutate({
            email,
        });
    };

    return (
        <>
            <h1>Verification</h1>
            {queue.map(Alert)}
            {email && from && (
                <EmailLink email={email} to={from} state={{ email }} />
            )}
            <p>Enter the code sent to your email</p>
            <AuthSignInVerifyForm
                onSubmit={authCodeVerify}
                propsButton={propsVerifyCodeButton}
                isLoading={mutationVerify.isPending}
            />
            <Button
                type="button"
                variant="secondary"
                onClick={authCodeResend}
                isLoading={mutationResend.isPending}
                {...propsResendCodeButton}
            />
        </>
    );
};
