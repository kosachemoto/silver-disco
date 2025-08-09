import { useMutation } from '@tanstack/react-query';

import {
    authPasskeyRequestDecoding,
    authPasskeyRequestFetching,
} from '@/shared/api/auth/passkey/request/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';

export const useAuthPasskeyRequestMutation = () => {
    return useMutation<PublicKeyCredentialRequestOptions, ApiError>({
        mutationFn: () =>
            authPasskeyRequestFetching()
                .then(apiErrorHandling)
                .then(authPasskeyRequestDecoding),
    });
};
