import { create } from '@github/webauthn-json';
import { useMutation } from '@tanstack/react-query';

import { authSignUpPasskeyRequestFetching } from '@/shared/api/auth/sign-up/passkey/request/utils';
import { authSignUpPasskeyVerifyFetching } from '@/shared/api/auth/sign-up/passkey/verify/utils';

import { apiErrorHandling } from '@/entities/api-error/utils';
import type { ApiError } from '@/entities/api-error/utils';
import type { TAuthSignUpPasskey } from '@/entities/auth/types';

export const useAuthSignUpPasskeyMutation = () =>
    useMutation<unknown, ApiError, TAuthSignUpPasskey>({
        mutationFn: (variables) =>
            authSignUpPasskeyRequestFetching(variables)
                .then(apiErrorHandling)
                .then(create)
                .then(authSignUpPasskeyVerifyFetching)
                .then(apiErrorHandling),
    });
