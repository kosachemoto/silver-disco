import type * as zod from 'zod';

import type { authSignInCodeVerifySchema } from '@/entities/auth/utils';

export type TAuthSignInCodeVerify = zod.infer<
    typeof authSignInCodeVerifySchema
>;
