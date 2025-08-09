import { useMutation } from '@tanstack/react-query';

import { authPasskeyVerifyFetching } from '@/shared/api/auth/passkey/verify/utils';
import type { ApiError } from '@/shared/api/utils';
import { apiErrorHandling } from '@/shared/api/utils';

import type { TPublicKeyCredential } from '@/entities/navigator/credentials/types';

export const useAuthPasskeyVerifyMutation = () => {
    return useMutation<unknown, ApiError, TPublicKeyCredential>({
        retry: false,
        mutationFn: (variables) =>
            authPasskeyVerifyFetching(variables).then(apiErrorHandling),
    });
};
