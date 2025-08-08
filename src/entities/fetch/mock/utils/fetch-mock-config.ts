import get from 'lodash/get';

import type { TFetchMockConfig } from '@/entities/fetch/mock/types';

import { bodyParsing } from './body-parsing';
import { response200Creating } from './response200-creating';
import { response500Creating } from './response500-creating';

export const fetchMockConfig: TFetchMockConfig = {
    '/api/auth/code/request': async (init) => {
        try {
            const body = await bodyParsing(init);
            const email = get(body, 'email');

            if (email.startsWith('500')) {
                return response500Creating();
            }
        } catch (err) {}

        return response200Creating();
    },
    '/api/auth/code/verify': async (init) => {
        try {
            const body = await bodyParsing(init);
            const code = get(body, 'code');

            if (code === 'invalid') {
                return new Response(
                    JSON.stringify({
                        error: {
                            id: 'auth.code.verify.invalid',
                            message: 'Invalid verification code',
                        },
                    }),
                    { status: 401 }
                );
            }

            if (code === 'expired') {
                return new Response(
                    JSON.stringify({
                        error: {
                            id: 'auth.code.verify.expired',
                            message: 'Code has expired. Request new one',
                        },
                    }),
                    { status: 401 }
                );
            }

            if (code === '500') {
                return response500Creating();
            }
        } catch (err) {}

        return response200Creating();
    },
};
