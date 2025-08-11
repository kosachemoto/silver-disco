export const authSignInPasskeyVerifyFetching = (
    credential: PublicKeyCredentialJSON
) =>
    fetch('/api/auth/passkey/verify', {
        method: 'POST',
        body: JSON.stringify(credential),
        headers: { 'Content-Type': 'application/json' },
    });
