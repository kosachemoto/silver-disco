import { useMutation } from '@tanstack/react-query';

import { authCodeRequestFetch } from '@/shared/api/auth/code/request/utils';
import type { ApiError } from '@/shared/api/utils';
import { apiErrorHandling } from '@/shared/api/utils';

import type { TAuthCodeRequest } from '@/entities/auth/types';

export const useAuthCodeRequestMutation = () =>
    useMutation<unknown, ApiError, TAuthCodeRequest>({
        retry: false,
        mutationFn: (variables) =>
            authCodeRequestFetch(variables).then(apiErrorHandling),
    });
