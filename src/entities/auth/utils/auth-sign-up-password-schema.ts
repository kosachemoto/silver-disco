import * as zod from 'zod';

import { emailSchema } from '@/entities/email/utils';
import { passwordSchema } from '@/entities/password/utils';

export const authSignUpPasswordSchema = zod.object({
    email: emailSchema,
    password: passwordSchema,
});
