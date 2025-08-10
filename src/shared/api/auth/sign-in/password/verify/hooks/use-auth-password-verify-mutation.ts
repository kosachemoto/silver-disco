import { useMutation } from '@tanstack/react-query';

import { authPasswordVerifyFetching } from '@/shared/api/auth/sign-in/password/verify/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignInPassword } from '@/entities/auth/types';

export const useAuthPasswordVerifyMutation = () =>
    useMutation<unknown, ApiError, TAuthSignInPassword>({
        retry: false,
        mutationFn: (variables) =>
            authPasswordVerifyFetching(variables).then(apiErrorHandling),
    });
