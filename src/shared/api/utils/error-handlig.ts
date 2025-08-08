export const errorHandling = async (res: Response) => {
    const body = await res.json().catch(() => {
        throw {
            id: 'error_handling',
            message: 'Unexpected parsing error',
        };
    });

    if (!res.ok) {
        throw body.error;
    }

    return body;
};
