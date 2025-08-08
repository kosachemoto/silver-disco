import type * as zod from 'zod';

import type { authLoginSchema } from '@/entities/auth/utils';

export type TAuthLogin = zod.infer<typeof authLoginSchema>;
