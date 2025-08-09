import get from 'lodash/get';

import type { TWebAuthnErrorRaw } from '@/entities/web-authn-error/types';

import { WebAuthnError } from './web-authn-error';

export const webAuthnErrorCreate = (
    error: TWebAuthnErrorRaw | unknown
): WebAuthnError => {
    let message: string | undefined = get(error, 'message');
    let cause: string | undefined = get(error, 'cause');

    if ([message, cause].includes(undefined)) {
        message = 'Unexpected WebAuthn error';
        cause = 'web_authn_error_unexpected';
    }

    const apiError = new WebAuthnError(message);
    apiError.cause = cause;

    return apiError;
};
