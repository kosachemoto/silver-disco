import * as zod from 'zod';

import { emailSchema } from '@/entities/email/utils';

export const authCodeRequestSchema = zod.object({
    email: emailSchema,
    remember: zod.boolean(),
});
