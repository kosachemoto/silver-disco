import type * as zod from 'zod';

import type { authSignInPasswordSchema } from '@/entities/auth/utils';

export type TAuthSignInPassword = zod.infer<typeof authSignInPasswordSchema>;
