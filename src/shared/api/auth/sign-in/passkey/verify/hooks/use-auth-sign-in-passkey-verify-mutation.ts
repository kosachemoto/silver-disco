import { useMutation } from '@tanstack/react-query';

import { authSignInPasskeyVerifyFetching } from '@/shared/api/auth/sign-in/passkey/verify/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TPublicKeyCredential } from '@/entities/navigator/credentials/types';

export const useAuthSignInPasskeyVerifyMutation = () => {
    return useMutation<unknown, ApiError, TPublicKeyCredential>({
        retry: false,
        mutationFn: (variables) =>
            authSignInPasskeyVerifyFetching(variables).then(apiErrorHandling),
    });
};
