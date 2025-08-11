import type * as zod from 'zod';

import type { authSignUpPasskeySchema } from '@/entities/auth/utils';

export type TAuthSignUpPasskey = zod.infer<typeof authSignUpPasskeySchema>;
