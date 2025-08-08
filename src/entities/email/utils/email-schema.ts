import * as zod from 'zod';

export const emailSchema = zod
    .string()
    .nonempty('Should not be empty')
    .email('Must match pattern "example@inbox.com"');
