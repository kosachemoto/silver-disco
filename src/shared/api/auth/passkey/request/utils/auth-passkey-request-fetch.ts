export const authPasskeyRequestFetch = () =>
    fetch('/api/auth/passkey/request', {
        method: 'POST',
    });
