import { useMutation } from '@tanstack/react-query';

import { authSignInCodeVerifyFetching } from '@/shared/api/auth/sign-in/code/verify/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignInCodeVerify } from '@/entities/auth/types';

type TOptions = {
    onPending?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthSignInCodeVerifyMutation = ({
    onPending: onMutate,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthSignInCodeVerify>({
        onMutate,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authSignInCodeVerifyFetching(variables).then(apiErrorHandling),
    });
