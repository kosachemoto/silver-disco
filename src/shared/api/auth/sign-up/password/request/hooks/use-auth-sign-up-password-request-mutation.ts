import { useMutation } from '@tanstack/react-query';

import { authSignUpPasswordRequestFetching } from '@/shared/api/auth/sign-up/password/request/utils';

import type { ApiError } from '@/entities/api-error/utils';
import { apiErrorHandling } from '@/entities/api-error/utils';
import type { TAuthSignUpPassword } from '@/entities/auth/types';

type TOptions = {
    onPending?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const useAuthSignUpPasswordRequestMutation = ({
    onPending,
    onSuccess,
    onError,
}: TOptions = {}) =>
    useMutation<unknown, ApiError, TAuthSignUpPassword>({
        onMutate: onPending,
        onSuccess,
        onError,
        mutationFn: (variables) =>
            authSignUpPasswordRequestFetching(variables).then(apiErrorHandling),
    });
