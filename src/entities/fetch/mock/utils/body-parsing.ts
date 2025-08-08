export const bodyParsing = async (init: RequestInit | undefined) => {
    if (typeof init?.body !== 'string') {
        throw new Error();
    }

    return JSON.parse(init.body);
};
