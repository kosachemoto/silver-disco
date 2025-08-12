import { useMutation } from '@tanstack/react-query';

import { authSignInCodeResendFetching } from '@/shared/api/auth/sign-in/code/resend/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignInCodeResend } from '@/entities/auth/types';

type TOptions = {
    onPending?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthSignInCodeResendMutation = ({
    onPending: onMutate,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthSignInCodeResend>({
        onMutate,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authSignInCodeResendFetching(variables).then(apiErrorHandling),
    });
