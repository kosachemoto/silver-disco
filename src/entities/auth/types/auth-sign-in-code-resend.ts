import type * as zod from 'zod';

import type { authSignInCodeResendSchema } from '@/entities/auth/utils';

export type TAuthSignInCodeResend = zod.infer<
    typeof authSignInCodeResendSchema
>;
