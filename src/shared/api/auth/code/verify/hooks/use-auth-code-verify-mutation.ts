import { useMutation } from '@tanstack/react-query';

import { authCodeVerifyFetch } from '@/shared/api/auth/code/verify/utils';
import type { ApiError } from '@/shared/api/utils';
import { apiErrorHandling } from '@/shared/api/utils';

import type { TAuthCodeVerify } from '@/entities/auth/types';

export const useAuthCodeVerifyMutation = () =>
    useMutation<unknown, ApiError, TAuthCodeVerify>({
        retry: false,
        mutationFn: (variables) =>
            authCodeVerifyFetch(variables).then(apiErrorHandling),
    });
