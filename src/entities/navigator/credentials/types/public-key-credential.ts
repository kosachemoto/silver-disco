export type TPublicKeyCredential = Omit<PublicKeyCredential, 'response'> & {
    response: AuthenticatorAssertionResponse;
};
