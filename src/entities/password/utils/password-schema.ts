import * as zod from 'zod';

export const passwordSchema = zod
    .string()
    .min(6, 'Must be at least 6 symbols')
    .max(24, 'Must be less than 24 symbols');
