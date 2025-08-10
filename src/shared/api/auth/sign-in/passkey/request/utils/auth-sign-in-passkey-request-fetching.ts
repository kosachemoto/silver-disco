export const authSignInPasskeyRequestFetching = () =>
    fetch('/api/auth/passkey/request', {
        method: 'POST',
    });
