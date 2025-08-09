import * as zod from 'zod';

import { emailSchema } from '@/entities/email/utils';

export const authSignUpSchema = zod.object({
    email: emailSchema,
});
