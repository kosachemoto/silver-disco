import type { TFetchMockConfig } from '@/entities/fetch/mock/types';

import { response200Creating } from './response200-creating';

export const fetchMockCreate =
    (config: TFetchMockConfig): typeof fetch =>
    async (input, options) => {
        console.log('🎭 [req]', input);

        const responseCreating = config[String(input)] || response200Creating;
        const response = await responseCreating(options);

        return new Promise<Response>((resolve) => {
            setTimeout(
                () => {
                    resolve(response);
                },
                Math.round(500 + Math.random() * 500)
            );
        }).then((data) => {
            console.log('🎭 [res]', input, String(data.status));

            return data;
        });
    };
