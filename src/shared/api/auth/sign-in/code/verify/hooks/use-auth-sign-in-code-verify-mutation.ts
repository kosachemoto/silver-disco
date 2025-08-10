import { useMutation } from '@tanstack/react-query';

import { authSignInCodeVerifyFetching } from '@/shared/api/auth/sign-in/code/verify/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignInCodeVerify } from '@/entities/auth/types';

export const useAuthSignInCodeVerifyMutation = () =>
    useMutation<unknown, ApiError, TAuthSignInCodeVerify>({
        retry: false,
        mutationFn: (variables) =>
            authSignInCodeVerifyFetching(variables).then(apiErrorHandling),
    });
