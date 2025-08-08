import * as zod from 'zod';

export const authCodeVerifySchema = zod.object({
    code: zod.string().nonempty('Should not be empty'),
});
