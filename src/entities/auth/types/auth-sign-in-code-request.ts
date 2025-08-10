import type * as zod from 'zod';

import type { authSignInCodeRequestSchema } from '@/entities/auth/utils';

export type TAuthSignInCodeRequest = zod.infer<
    typeof authSignInCodeRequestSchema
>;
