import type * as zod from 'zod';

import type { authCodeResendSchema } from '@/entities/auth/utils';

export type TAuthCodeResend = zod.infer<typeof authCodeResendSchema>;
