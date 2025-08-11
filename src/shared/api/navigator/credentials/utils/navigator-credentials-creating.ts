import { convertArrayBufferToBase64 } from '@/shared/utils';

import { webAuthnErrorCreate } from '@/entities/web-authn-error/utils';

export const navigatorCredentialsCreating = async (
    publicKey: PublicKeyCredentialCreationOptions
) => {
    try {
        const credential = await navigator.credentials.create({ publicKey });

        if (!(credential instanceof PublicKeyCredential)) {
            throw webAuthnErrorCreate({
                cause: 'web_authn_error_credential_unexpected',
                message: 'Unexpected credential type',
            });
        }

        if (
            !(credential.response instanceof AuthenticatorAttestationResponse)
        ) {
            throw webAuthnErrorCreate({
                cause: 'web_authn_error_credential_response_unexpected',
                message: 'Unexpected credential response type',
            });
        }

        const { rawId, response } = credential;
        const { attestationObject, clientDataJSON } = response;

        return {
            ...credential,
            rawId: convertArrayBufferToBase64(rawId),
            response: {
                ...response,
                attestationObject:
                    convertArrayBufferToBase64(attestationObject),
                clientDataJSON: convertArrayBufferToBase64(clientDataJSON),
            },
        };
    } catch (err) {
        throw webAuthnErrorCreate(err);
    }
};
