import { useMutation } from '@tanstack/react-query';

import { authCodeResendFetching } from '@/shared/api/auth/code/resend/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthCodeResend } from '@/entities/auth/types';

type TOptions = {
    onPending?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthCodeResendMutation = ({
    onPending: onMutate,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthCodeResend>({
        onMutate,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authCodeResendFetching(variables).then(apiErrorHandling),
    });
