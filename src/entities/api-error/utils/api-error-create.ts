import get from 'lodash/get';

import type { TApiErrorRaw } from '@/entities/api-error/types';

import { ApiError } from './api-error';

export const apiErrorCreate = (error: TApiErrorRaw | unknown): ApiError => {
    let message: string | undefined = get(error, 'message');
    let cause: string | undefined = get(error, 'cause');

    if ([message, cause].includes(undefined)) {
        message = 'Unexpected API error';
        cause = 'api_error_unexpected';
    }

    const apiError = new ApiError(message);
    apiError.cause = cause;

    return apiError;
};
