import { useMutation } from '@tanstack/react-query';

import { authCodeResendFetch } from '@/shared/api/auth/code/resend/utils';
import type { TError } from '@/shared/api/types';
import { errorHandling } from '@/shared/api/utils';

import type { TAuthCodeResend } from '@/entities/auth/types';

export const useAuthCodeResendMutation = () =>
    useMutation<unknown, TError, TAuthCodeResend>({
        retry: false,
        mutationFn: (variables) =>
            authCodeResendFetch(variables).then(errorHandling),
    });
