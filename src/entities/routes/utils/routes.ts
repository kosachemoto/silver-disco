import { createRoute } from './create-route';

export const routes = createRoute('/silver-disco', {
    auth: {
        'sign-up': {},
        'sign-in': {
            code: {},
            'code-verification': {},
            password: {},
        },
        'sign-up-passkey': {},
        success: {},
    },
});
