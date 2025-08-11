import { convertArrayBufferToBase64 } from '@/shared/utils';

import { webAuthnErrorCreate } from '@/entities/web-authn-error/utils';

export const navigatorCredentialsGetting = async (
    publicKey: PublicKeyCredentialRequestOptions
) => {
    try {
        const credential = await navigator.credentials.get({ publicKey });

        if (!(credential instanceof PublicKeyCredential)) {
            throw webAuthnErrorCreate({
                cause: 'web_authn_error_credential_unexpected',
                message: 'Unexpected credential type',
            });
        }

        if (!(credential.response instanceof AuthenticatorAssertionResponse)) {
            throw webAuthnErrorCreate({
                cause: 'web_authn_error_credential_response_unexpected',
                message: 'Unexpected credential response type',
            });
        }

        const { rawId, response } = credential;
        const { authenticatorData, clientDataJSON, signature, userHandle } =
            response;

        return {
            ...credential,
            rawId: convertArrayBufferToBase64(rawId),
            response: {
                ...response,
                authenticatorData:
                    convertArrayBufferToBase64(authenticatorData),
                clientDataJSON: convertArrayBufferToBase64(clientDataJSON),
                signature: convertArrayBufferToBase64(signature),
                userHandle:
                    userHandle && convertArrayBufferToBase64(userHandle),
            },
        };
    } catch (err) {
        throw webAuthnErrorCreate(err);
    }
};
