import { useMutation } from '@tanstack/react-query';

import { authPasswordVerifyFetching } from '@/shared/api/auth/sign-in/password/verify/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignInPassword } from '@/entities/auth/types';

type TOptions = {
    onPending?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthPasswordVerifyMutation = ({
    onPending,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthSignInPassword>({
        onMutate: onPending,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authPasswordVerifyFetching(variables).then(apiErrorHandling),
    });
