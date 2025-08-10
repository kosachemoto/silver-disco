import * as zod from 'zod';

import { emailSchema } from '@/entities/email/utils';

export const authSignInCodeRequestSchema = zod.object({
    email: emailSchema,
    remember: zod.boolean().optional(),
});
