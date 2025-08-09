import { useMutation } from '@tanstack/react-query';

import { authCodeRequestFetching } from '@/shared/api/auth/code/request/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthCodeRequest } from '@/entities/auth/types';

export const useAuthCodeRequestMutation = () =>
    useMutation<unknown, ApiError, TAuthCodeRequest>({
        retry: false,
        mutationFn: (variables) =>
            authCodeRequestFetching(variables).then(apiErrorHandling),
    });
