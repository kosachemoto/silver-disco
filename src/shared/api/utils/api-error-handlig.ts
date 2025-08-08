import { apiErrorCreate } from './api-error-create';

export const apiErrorHandling = async (res: Response) => {
    const body = await res.json().catch(() => {
        throw apiErrorCreate({
            id: 'error_handling',
            message: 'Unexpected parsing error',
        });
    });

    if (!res.ok) {
        throw apiErrorCreate(body.error);
    }

    return body;
};
