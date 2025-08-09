import type * as zod from 'zod';

import type { authSignUpSchema } from '@/entities/auth/utils';

export type TAuthSignUp = zod.infer<typeof authSignUpSchema>;
