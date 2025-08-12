import { useMutation } from '@tanstack/react-query';

import { authCodeSignInRequestFetching } from '@/shared/api/auth/sign-in/code/request/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignInCodeRequest } from '@/entities/auth/types';

type TOptions = {
    onPending?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthSignInCodeRequestMutation = ({
    onPending,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthSignInCodeRequest>({
        onMutate: onPending,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authCodeSignInRequestFetching(variables).then(apiErrorHandling),
    });
