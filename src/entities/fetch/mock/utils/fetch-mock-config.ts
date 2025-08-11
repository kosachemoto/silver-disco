import get from 'lodash/get';

import { convertArrayBufferToBase64 } from '@/shared/utils';

import type { TFetchMockConfig } from '@/entities/fetch/mock/types';

import { bodyParsing } from './body-parsing';
import { response200Creating } from './response200-creating';
import { response500Creating } from './response500-creating';

export const fetchMockConfig: TFetchMockConfig = {
    '/api/auth/password/verify': async (init) => {
        try {
            const body = await bodyParsing(init);
            const email = get(body, 'email');

            if (email.startsWith('invalid')) {
                return new Response(
                    JSON.stringify({
                        error: {
                            id: 'auth.login.invalid',
                            message: 'Wrong email & password combination',
                        },
                    }),
                    { status: 401 }
                );
            }

            if (email.startsWith('500')) {
                return response500Creating();
            }
        } catch (err) {
            console.warn('🎭 [err]', err);
        }

        return response200Creating();
    },
    '/api/auth/code/request': async (init) => {
        try {
            const body = await bodyParsing(init);
            const email = get(body, 'email');

            if (email.startsWith('invalid')) {
                return new Response(
                    JSON.stringify({
                        error: {
                            id: 'auth.login.invalid',
                            message: 'Wrong email & password combination',
                        },
                    }),
                    { status: 401 }
                );
            }

            if (email.startsWith('500')) {
                return response500Creating();
            }
        } catch (err) {
            console.warn('🎭 [err]', err);
        }

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
        } catch (err) {
            console.warn('🎭 [err]', err);
        }

        return response200Creating();
    },
    '/api/auth/sign-up/passkey/request': async (init) => {
        console.log('# ?:', init);
        const body = await bodyParsing(init);
        const displayName = get(body, 'displayName');
        const name = get(body, 'email');

        return new Response(
            JSON.stringify({
                rpId: 'localhost',
                challenge: convertArrayBufferToBase64(
                    crypto.getRandomValues(new Uint8Array(32))
                ),
                rp: {
                    name: 'rp-name',
                    id: 'localhost',
                },
                user: {
                    id: convertArrayBufferToBase64(
                        crypto.getRandomValues(new Uint8Array(32))
                    ),
                    displayName,
                    name,
                },
                pubKeyCredParams: [
                    {
                        alg: -7,
                        type: 'public-key',
                    },
                    {
                        alg: -257,
                        type: 'public-key',
                    },
                ],
                attestation: 'direct',
                excludeCredentials: [],
                authenticatorSelection: {
                    residentKey: 'required',
                    userVerification: 'preferred',
                    requireResidentKey: true,
                },
                extensions: {
                    credProps: true,
                },
            }),
            { status: 200 }
        );
    },
    '/api/auth/passkey/request': async () =>
        new Response(
            JSON.stringify({
                rpId: 'localhost',
                challenge: convertArrayBufferToBase64(
                    crypto.getRandomValues(new Uint8Array(32))
                ),
                allowCredentials: [],
                timeout: 300000,
                userVerification: 'preferred',
            }),
            { status: 200 }
        ),
};
