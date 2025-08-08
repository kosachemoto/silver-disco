export const convertArrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const uint8array = new Uint8Array(buffer);

    return btoa(String.fromCharCode(...uint8array))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};
