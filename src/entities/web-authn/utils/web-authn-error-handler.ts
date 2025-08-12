import get from 'lodash/get';

import { AppError } from '@/entities/app-error/utils';

export const webAuthnErrorHandler = (error: unknown) => {
    const name = get(error, 'name');

    if (name === 'NotAllowedError') {
        const error = new AppError(
            'The sign-in request was canceled or timed out. Please try again'
        );
        error.cause = 'app_error_web_authn_not_allowed';

        throw error;
    }

    throw error;
};
