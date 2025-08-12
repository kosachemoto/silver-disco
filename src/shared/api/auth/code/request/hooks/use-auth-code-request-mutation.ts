import { useMutation } from '@tanstack/react-query';

import { authCodeRequestFetching } from '@/shared/api/auth/code/request/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthCodeRequest } from '@/entities/auth/types';

type TOptions = {
    onPending?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthCodeRequestMutation = ({
    onPending,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthCodeRequest>({
        onMutate: onPending,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authCodeRequestFetching(variables).then(apiErrorHandling),
    });
