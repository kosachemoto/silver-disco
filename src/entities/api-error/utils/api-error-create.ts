import get from 'lodash/get';

import type { TApiErrorRaw } from '@/entities/api-error/types';

import { ApiError } from './api-error';

export const apiErrorCreate = (error: TApiErrorRaw | unknown): ApiError => {
    const message: string = get(error, 'message') || 'Unexpected API error';
    const cause: string = get(error, 'cause') || 'api_error';

    const apiError = new ApiError(message);
    apiError.cause = cause;

    return apiError;
};
