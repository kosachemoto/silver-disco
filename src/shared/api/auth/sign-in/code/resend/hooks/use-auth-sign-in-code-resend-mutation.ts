import { useMutation } from '@tanstack/react-query';

import { authSignInCodeResendFetching } from '@/shared/api/auth/sign-in/code/resend/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignInCodeResend } from '@/entities/auth/types';

export const useAuthSignInCodeResendMutation = () =>
    useMutation<unknown, ApiError, TAuthSignInCodeResend>({
        retry: false,
        mutationFn: (variables) =>
            authSignInCodeResendFetching(variables).then(apiErrorHandling),
    });
