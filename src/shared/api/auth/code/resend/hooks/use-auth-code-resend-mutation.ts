import { useMutation } from '@tanstack/react-query';

import { authCodeResendFetch } from '@/shared/api/auth/code/resend/utils';
import type { ApiError } from '@/shared/api/utils';
import { apiErrorHandling } from '@/shared/api/utils';

import type { TAuthCodeResend } from '@/entities/auth/types';

export const useAuthCodeResendMutation = () =>
    useMutation<unknown, ApiError, TAuthCodeResend>({
        retry: false,
        mutationFn: (variables) =>
            authCodeResendFetch(variables).then(apiErrorHandling),
    });
