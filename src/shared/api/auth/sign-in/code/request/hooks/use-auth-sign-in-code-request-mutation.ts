import { useMutation } from '@tanstack/react-query';

import { authCodeSignInRequestFetching } from '@/shared/api/auth/sign-in/code/request/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignInCodeRequest } from '@/entities/auth/types';

export const useAuthSignInCodeRequestMutation = () =>
    useMutation<unknown, ApiError, TAuthSignInCodeRequest>({
        retry: false,
        mutationFn: (variables) =>
            authCodeSignInRequestFetching(variables).then(apiErrorHandling),
    });
