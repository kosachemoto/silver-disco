import * as zod from 'zod';

import { emailSchema } from '@/entities/email/utils';
import { passwordSchema } from '@/entities/password/utils';

export const authLoginSchema = zod.object({
    email: emailSchema,
    password: passwordSchema,
    remember: zod.boolean(),
});
