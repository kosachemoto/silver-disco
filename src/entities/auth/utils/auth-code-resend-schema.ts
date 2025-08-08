import * as zod from 'zod';

import { emailSchema } from '@/entities/email/utils';

export const authCodeResendSchema = zod.object({
    email: emailSchema,
});
