export const authPasskeyRequestFetching = () =>
    fetch('/api/auth/passkey/request', {
        method: 'POST',
    });
