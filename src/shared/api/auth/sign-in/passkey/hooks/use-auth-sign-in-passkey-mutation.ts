import { get } from '@github/webauthn-json';
import { useMutation } from '@tanstack/react-query';
import noop from 'lodash/noop';

import { authSignInPasskeyRequestFetching } from '@/shared/api/auth/sign-in/passkey/request/utils';
import { authSignInPasskeyVerifyFetching } from '@/shared/api/auth/sign-in/passkey/verify/utils';

import { apiErrorHandling } from '@/entities/api-error/utils';
import { webAuthnErrorHandler } from '@/entities/web-authn/utils';

type TOptions = {
    onPending?: () => void;
    onVerifying?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthSignInPasskeyMutation = ({
    onPending,
    onVerifying = noop,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation({
        onMutate: onPending,
        onSuccess,
        onError,
        mutationFn: () =>
            authSignInPasskeyRequestFetching()
                .then(apiErrorHandling)
                .then(get)
                .catch(webAuthnErrorHandler)
                .then((data) => {
                    onVerifying();
                    return data;
                })
                .then(authSignInPasskeyVerifyFetching)
                .then(apiErrorHandling),
    });
