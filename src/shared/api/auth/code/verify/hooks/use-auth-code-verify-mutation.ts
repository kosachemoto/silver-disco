import { useMutation } from '@tanstack/react-query';

import { authCodeVerifyFetching } from '@/shared/api/auth/code/verify/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthCodeVerify } from '@/entities/auth/types';

type TOptions = {
    onPending?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthCodeVerifyMutation = ({
    onPending: onMutate,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthCodeVerify>({
        onMutate,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authCodeVerifyFetching(variables).then(apiErrorHandling),
    });
