import * as zod from 'zod';

import { emailSchema } from '@/entities/email/utils';

export const authSignUpPasskeySchema = zod.object({
    displayName: zod.string().nonempty('Should not be empty'),
    email: emailSchema,
});
