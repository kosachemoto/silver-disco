import { useMutation } from '@tanstack/react-query';

import {
    authSignInPasskeyRequestDecoding,
    authSignInPasskeyRequestFetching,
} from '@/shared/api/auth/sign-in/passkey/request/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';

export const useAuthSignInPasskeyRequestMutation = () => {
    return useMutation<PublicKeyCredentialRequestOptions, ApiError>({
        mutationFn: () =>
            authSignInPasskeyRequestFetching()
                .then(apiErrorHandling)
                .then(authSignInPasskeyRequestDecoding),
    });
};
