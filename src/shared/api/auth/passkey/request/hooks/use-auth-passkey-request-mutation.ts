import { useMutation } from '@tanstack/react-query';

import {
    authPasskeyRequestDecoding,
    authPasskeyRequestFetching,
} from '@/shared/api/auth/passkey/request/utils';
import type { ApiError } from '@/shared/api/utils';
import { apiErrorHandling } from '@/shared/api/utils';

export const useAuthPasskeyRequestMutation = () => {
    return useMutation<PublicKeyCredentialRequestOptions, ApiError>({
        mutationFn: () =>
            authPasskeyRequestFetching()
                .then(apiErrorHandling)
                .then(authPasskeyRequestDecoding),
    });
};
