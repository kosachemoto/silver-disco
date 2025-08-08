import type { TPublicKeyCredential } from '@/entities/navigator/credentials/types';

export const checkIsPublicKeyCredential = (
    credential: Credential | null
): credential is TPublicKeyCredential =>
    credential instanceof PublicKeyCredential &&
    credential.response instanceof AuthenticatorAssertionResponse;
