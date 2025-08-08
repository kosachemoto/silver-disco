import { useMutation } from '@tanstack/react-query';

import { authCodeRequestFetch } from '@/shared/api/auth/code/request/utils';
import type { TError } from '@/shared/api/types';
import { errorHandling } from '@/shared/api/utils';

import type { TAuthCodeRequest } from '@/entities/auth/types';

export const useAuthCodeRequestMutation = () => {
    return useMutation<unknown, TError, TAuthCodeRequest>({
        retry: false,
        mutationFn: (variables) =>
            authCodeRequestFetch(variables).then(errorHandling),
    });
};
