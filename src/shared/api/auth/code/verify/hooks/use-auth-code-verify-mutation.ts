import { useMutation } from '@tanstack/react-query';

import { authCodeVerifyFetch } from '@/shared/api/auth/code/verify/utils';
import type { TError } from '@/shared/api/types';
import { errorHandling } from '@/shared/api/utils';

import type { TAuthCodeVerify } from '@/entities/auth/types';

export const useAuthCodeVerifyMutation = () =>
    useMutation<unknown, TError, TAuthCodeVerify>({
        retry: false,
        mutationFn: (variables) =>
            authCodeVerifyFetch(variables).then(errorHandling),
    });
