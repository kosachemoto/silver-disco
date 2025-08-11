import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    Outlet,
    RouterProvider,
    createRootRoute,
    createRoute,
    createRouter,
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

const successRoute = createRoute({
    getParentRoute: () => authRoute,
    path: '/success',
    component: AuthSuccess,
});

const routeTree = rootRoute.addChildren([
    authRoute.addChildren([
        signInRoute,
        signInVerificationRoute,
        signInPasswordRoute,
        signUpRoute,
        signUpVerificationRoute,
        signUpPasskeyRoute,
        successRoute,
    ]),
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
