import { useMutation } from '@tanstack/react-query';

import {
    authSignInPasskeyRequestDecoding,
    authSignInPasskeyRequestFetching,
} from '@/shared/api/auth/sign-in/passkey/request/utils';
import { authSignInPasskeyVerifyFetching } from '@/shared/api/auth/sign-in/passkey/verify/utils';
import { navigatorCredentialsGetting } from '@/shared/api/navigator/credentials/utils';

import { apiErrorHandling } from '@/entities/api-error/utils';

export const useAuthSignInPasskeyMutation = () =>
    useMutation({
        mutationFn: () =>
            authSignInPasskeyRequestFetching()
                .then(apiErrorHandling)
                .then(authSignInPasskeyRequestDecoding)
                .then(navigatorCredentialsGetting)
                .then(authSignInPasskeyVerifyFetching)
                .then(apiErrorHandling),
    });
