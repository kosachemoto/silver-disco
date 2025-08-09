import React from 'react';
import { useNavigate } from 'react-router';

import { useAuthCodeRouteState } from '@/pages/auth/hooks';

import { AuthCodeVerifyForm } from '@/widgets/auth/ui/auth-code-verify-form';

import { EmailLink } from '@/features/email/ui';

import { useAuthCodeResendMutation } from '@/shared/api/auth/code/resend/hooks';
import { useAuthCodeVerifyMutation } from '@/shared/api/auth/code/verify/hooks';
import { useAlert } from '@/shared/hooks/alert';
import { Alert } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Link } from '@/shared/ui/link';

import type { TAuthCodeVerify } from '@/entities/auth/types';

export const AuthCodeVerify: React.FC = () => {
    const navigate = useNavigate();
    const { props, setApiError } = useAlert();
    const data = useAuthCodeRouteState();
    const { email } = data;
    const mutationVerify = useAuthCodeVerifyMutation();
    const mutationResend = useAuthCodeResendMutation();

    if (!email) {
        return (
            <>
                <h1>Verification</h1>
                <Alert>Unexpected error</Alert>
                <div>
                    <Link to="/auth">Get back to login</Link>
                </div>
            </>
        );
    }

    const authCodeVerify = (data: TAuthCodeVerify) => {
        mutationVerify.mutate(data, {
            onSuccess: () => {
                navigate('/auth/success');
            },
            onError: setApiError,
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
            {mutationVerify.isError && <Alert {...props} />}
            {email && (
                <EmailLink
                    email={email}
                    to="/auth/code-request"
                    state={{ email }}
                />
            )}
            <p>Enter the code sent to your email</p>
            <AuthCodeVerifyForm
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
