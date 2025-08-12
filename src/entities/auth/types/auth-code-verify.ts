import type * as zod from 'zod';

import type { authCodeVerifySchema } from '@/entities/auth/utils';

export type TAuthCodeVerify = zod.infer<typeof authCodeVerifySchema>;
