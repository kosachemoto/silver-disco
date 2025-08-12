import { create } from '@github/webauthn-json';
import { useMutation } from '@tanstack/react-query';
import noop from 'lodash/noop';

import { authSignUpPasskeyRequestFetching } from '@/shared/api/auth/sign-up/passkey/request/utils';
import { authSignUpPasskeyVerifyFetching } from '@/shared/api/auth/sign-up/passkey/verify/utils';

import { apiErrorHandling } from '@/entities/api-error/utils';
import type { ApiError } from '@/entities/api-error/utils';
import type { TAuthSignUpPasskey } from '@/entities/auth/types';
import { webAuthnErrorHandler } from '@/entities/web-authn/utils';

type TOptions = {
    onPending?: () => void;
    onVerifying?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthSignUpPasskeyMutation = ({
    onPending,
    onVerifying = noop,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthSignUpPasskey>({
        onMutate: onPending,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authSignUpPasskeyRequestFetching(variables)
                .then(apiErrorHandling)
                .then(create)
                .catch(webAuthnErrorHandler)
                .then((data) => {
                    onVerifying();
                    return data;
                })
                .then(authSignUpPasskeyVerifyFetching)
                .then(apiErrorHandling),
    });
