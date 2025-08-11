import { get } from '@github/webauthn-json';
import { useMutation } from '@tanstack/react-query';

import { authSignInPasskeyRequestFetching } from '@/shared/api/auth/sign-in/passkey/request/utils';
import { authSignInPasskeyVerifyFetching } from '@/shared/api/auth/sign-in/passkey/verify/utils';

import { apiErrorHandling } from '@/entities/api-error/utils';

export const useAuthSignInPasskeyMutation = () =>
    useMutation({
        mutationFn: () =>
            authSignInPasskeyRequestFetching()
                .then(apiErrorHandling)
                .then(get)
                .then(authSignInPasskeyVerifyFetching)
                .then(apiErrorHandling),
    });
