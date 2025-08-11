import { createRoute } from './create-route';

export const routes = createRoute('/silver-disco', {
    auth: {
        'sign-up': {
            verification: {},
        },
        'sign-in': {
            verification: {},
            password: {},
        },
        'sign-up-passkey': {},
        success: {},
    },
});
