import { convertBase64toArrayBuffer } from '@/shared/utils';

import type { TAuthPasskeyRequestData } from '@/entities/auth/types';

export const authPasskeyRequestDecoding = async (
    body: TAuthPasskeyRequestData
): Promise<PublicKeyCredentialRequestOptions> => {
    const { challenge, allowCredentials } = body;

    return {
        ...body,
        challenge: convertBase64toArrayBuffer(challenge),
        allowCredentials: allowCredentials.map((credential) => ({
            ...credential,
            id: convertBase64toArrayBuffer(credential.id),
        })),
    };
};
