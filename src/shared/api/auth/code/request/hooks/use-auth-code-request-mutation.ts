import { useMutation } from '@tanstack/react-query';

import { authCodeRequestFetch } from '@/shared/api/auth/code/request/utils';

import type { TAuthCodeRequest } from '@/entities/auth/types';

export const useAuthCodeRequestMutation = () => {
    return useMutation<unknown, unknown, TAuthCodeRequest>({
        retry: false,
        mutationFn: (variables) =>
            authCodeRequestFetch(variables).then((res) => {
                if (!res.ok) {
                    throw new Error();
                }

                return res.json();
            }),
    });
};
