import type * as zod from 'zod';

import type { authSignUpPasswordSchema } from '@/entities/auth/utils';

export type TAuthSignUpPassword = zod.infer<typeof authSignUpPasswordSchema>;
