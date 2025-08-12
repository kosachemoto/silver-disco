import { useLocation, useRouter } from '@tanstack/react-router';
import React from 'react';

import {
    useAuthResendCodeButton,
    useAuthVerifyCodeButton,
} from '@/pages/auth/hooks';

import { AuthVerificationForm } from '@/widgets/auth/ui/auth-verification-form';

import { EmailLink } from '@/features/email/ui';

import { useAuthCodeResendMutation } from '@/shared/api/auth/code/resend/hooks';
import { useAuthCodeVerifyMutation } from '@/shared/api/auth/code/verify/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Link } from '@/shared/ui/link';

import type { TAuthCodeVerify } from '@/entities/auth/types';

export const AuthVerification: React.FC = () => {
    const router = useRouter();
    const location = useLocation();
    const { email, from } = location.state;
    const { queue, unshiftApiErorr } = useAlertManager();
    const { props: propsVerifyCodeButton, ...optionsVerifyCodeButton } =
        useAuthVerifyCodeButton();
    const { props: propsResendCodeButton, ...optionsResendCodeButton } =
        useAuthResendCodeButton();
    const mutationVerify = useAuthCodeVerifyMutation(optionsVerifyCodeButton);
    const mutationResend = useAuthCodeResendMutation(optionsResendCodeButton);

    if (!email) {
        return (
            <>
                <h1>Verification</h1>
                <Alert>Unexpected error</Alert>
                <div>{from && <Link to={from}>Get back</Link>}</div>
            </>
        );
    }

    const authCodeVerify = (data: TAuthCodeVerify) => {
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
            <AuthVerificationForm
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
