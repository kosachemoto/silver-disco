import * as zod from 'zod';

import { emailSchema } from '@/entities/email/utils';

export const authSignInCodeResendSchema = zod.object({
    email: emailSchema,
});
