import type { TEncoded } from '@/shared/types';
import { convertArrayBufferToBase64 } from '@/shared/utils';

import type { TPublicKeyCredential } from '@/entities/navigator/credentials/types';

export const authPasskeyVerifyFetch = (
    data: TPublicKeyCredential | undefined
) => {
    if (!data) {
        return Promise.reject('No payload');
    }

    const { rawId, response, ...restData } = data;
    const { authenticatorData, clientDataJSON, signature, userHandle } =
        response;

    const dataEncoded: TEncoded<TPublicKeyCredential> = {
        ...restData,
        rawId: convertArrayBufferToBase64(rawId),
        response: {
            authenticatorData: convertArrayBufferToBase64(authenticatorData),
            clientDataJSON: convertArrayBufferToBase64(clientDataJSON),
            signature: convertArrayBufferToBase64(signature),
            userHandle: userHandle && convertArrayBufferToBase64(userHandle),
        },
    };

    return fetch('/api/auth/passkey/verify', {
        method: 'POST',
        body: JSON.stringify(dataEncoded),
        headers: { 'Content-Type': 'application/json' },
    });
};
