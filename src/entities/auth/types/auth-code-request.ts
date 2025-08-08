import type * as zod from 'zod';

import type { authCodeRequestSchema } from '@/entities/auth/utils';

export type TAuthCodeRequest = zod.infer<typeof authCodeRequestSchema>;
