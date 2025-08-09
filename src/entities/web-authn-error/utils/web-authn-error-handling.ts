import { webAuthnErrorCreate } from './web-authn-error-create';

export const webAuthnErrorHandling = async (error: unknown) => {
    if (!(error instanceof Error)) {
        throw webAuthnErrorCreate({
            message: 'Unexpected parsing error',
            cause: 'web_authn_error_parsing',
        });
    }

    if (error.name === 'NotAllowedError') {
        throw webAuthnErrorCreate({
            message: 'The operation either timed out or was not allowed',
            cause: 'web_authn_error_not_allowed_error',
        });
    }

    throw webAuthnErrorCreate({
        message: error.message,
        cause: 'web_authn_error_unknown',
    });
};
