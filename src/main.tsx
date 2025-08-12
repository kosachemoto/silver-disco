import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    Outlet,
    RouterProvider,
    createRootRoute,
    createRoute,
    createRouter,
    redirect,
} from '@tanstack/react-router';
import type { LinkProps } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AuthLayout } from '@/pages/auth/ui/auth-layout';
import { AuthSignIn } from '@/pages/auth/ui/auth-sign-in';
import { AuthSignInPassword } from '@/pages/auth/ui/auth-sign-in-password';
import { AuthSignInVerify } from '@/pages/auth/ui/auth-sign-in-verify';
import { AuthSuccess } from '@/pages/auth/ui/auth-success';
import { AuthSignUp } from '@/pages/auth/ui/sign-up';
import { AuthSignUpPasskey } from '@/pages/auth/ui/sign-up-passkey';
import { AuthSignUpPassword } from '@/pages/auth/ui/sign-up-password';

import { fetchMockSetUp } from '@/entities/fetch/mock/utils';

import './global.css';

fetchMockSetUp();

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});

const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthLayout,
});

const signInRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/sign-in',
    component: AuthSignIn,
});

const signInVerificationRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/sign-in/verification',
    component: AuthSignInVerify,
});

const signInPasswordRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/sign-in/password',
    component: AuthSignInPassword,
});

const signUpRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/sign-up',
    component: AuthSignUp,
});

const signUpVerificationRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/sign-up/verification',
    component: AuthSignInVerify,
});

const signUpPasskeyRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/sign-up/passkey',
    component: AuthSignUpPasskey,
});

const signUpPasswordRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/sign-up/password',
    component: AuthSignUpPassword,
});

const successRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/success',
    component: AuthSuccess,
});

const catchAuthSignInRoute = createRoute({
    getParentRoute: () => authRoute,
    path: 'sign-in/$$rest*',
    beforeLoad: () => {
        throw redirect({
            to: '/auth/sign-in',
        });
    },
});

const catchAuthRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/$',
    beforeLoad: () => {
        throw redirect({
            to: '/auth/sign-up',
        });
    },
});

const catchRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$',
    beforeLoad: () => {
        throw redirect({
            to: '/auth',
        });
    },
});

const routeTree = rootRoute.addChildren([
    authRoute.addChildren([
        signUpRoute,
        signUpVerificationRoute,
        signUpPasskeyRoute,
        signUpPasswordRoute,
        signInRoute,
        signInVerificationRoute,
        signInPasswordRoute,
        successRoute,
        catchAuthSignInRoute,
        catchAuthRoute,
    ]),
    catchRoute,
]);

const router = createRouter({ routeTree, basepath: '/silver-disco' });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }

    interface HistoryState {
        email?: string;
        from?: LinkProps['to'];
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);
