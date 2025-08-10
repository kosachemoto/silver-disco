export type TAuthSignInPasskeyRequestData = {
    rpId: string;
    challenge: string;
    allowCredentials: Array<{ id: string; type: PublicKeyCredentialType }>;
    timeout: number;
    userVerification: UserVerificationRequirement;
};
