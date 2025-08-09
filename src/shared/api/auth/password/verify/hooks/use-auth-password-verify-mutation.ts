import { useMutation } from '@tanstack/react-query';

import { authPasswordVerifyFetching } from '@/shared/api/auth/password/verify/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthLogin } from '@/entities/auth/types';

export const useAuthPasswordVerifyMutation = () =>
    useMutation<unknown, ApiError, TAuthLogin>({
        retry: false,
        mutationFn: (variables) =>
            authPasswordVerifyFetching(variables).then(apiErrorHandling),
    });
