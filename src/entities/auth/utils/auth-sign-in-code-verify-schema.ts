import * as zod from 'zod';

export const authSignInCodeVerifySchema = zod.object({
    code: zod.string().nonempty('Should not be empty'),
});
