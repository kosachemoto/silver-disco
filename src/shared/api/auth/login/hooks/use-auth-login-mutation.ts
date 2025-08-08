import { useMutation } from '@tanstack/react-query';

import { authLoginFetch } from '@/shared/api/auth/login/utils';
import type { ApiError } from '@/shared/api/utils';
import { apiErrorHandling } from '@/shared/api/utils';

import type { TAuthLogin } from '@/entities/auth/types';

export const useAuthLoginMutation = () =>
    useMutation<unknown, ApiError, TAuthLogin>({
        retry: false,
        mutationFn: (variables) =>
            authLoginFetch(variables).then(apiErrorHandling),
    });
