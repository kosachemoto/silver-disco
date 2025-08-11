export const authSignUpPasskeyVerifyFetching = (
    credential: PublicKeyCredentialJSON
) => {
    return fetch('/api/auth/sign-up/passkey/verify', {
        body: JSON.stringify(credential),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
