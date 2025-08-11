import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthCodeRouteState } from '@/pages/auth/hooks';

import { AuthSignInVerifyForm } from '@/widgets/auth/ui/auth-sign-in-verification-form';

import { EmailLink } from '@/features/email/ui';

import { useAuthSignInCodeResendMutation } from '@/shared/api/auth/sign-in/code/resend/hooks';
import { useAuthSignInCodeVerifyMutation } from '@/shared/api/auth/sign-in/code/verify/hooks';
import { useAlertManager } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Link } from '@/shared/ui/link';
import { convertApiErrorToProps } from '@/shared/utils/alert';

import type { TAuthSignInCodeVerify } from '@/entities/auth/types';
import { routes } from '@/entities/routes/utils';

export const AuthSignInVerify: React.FC = () => {
    const navigate = useNavigate();
    const { queue, unshift } = useAlertManager();
    const { email, from } = useAuthCodeRouteState();
    const mutationVerify = useAuthSignInCodeVerifyMutation();
    const mutationResend = useAuthSignInCodeResendMutation();

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
                navigate(routes.auth.success.path);
            },
            onError: (error) => {
                unshift(convertApiErrorToProps(error));
            },
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
                isLoading={mutationVerify.isPending}
            />
            <Button
                type="button"
                variant="secondary"
                onClick={authCodeResend}
                isLoading={mutationResend.isPending}
            >
                Send again
            </Button>
        </>
    );
};
