import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthLayout } from '@/pages/auth/ui/auth-layout';
import { AuthSignIn } from '@/pages/auth/ui/auth-sign-in';
import { AuthSignInPassword } from '@/pages/auth/ui/auth-sign-in-password';
import { AuthSignInVerify } from '@/pages/auth/ui/auth-sign-in-verify';
import { AuthSuccess } from '@/pages/auth/ui/auth-success';
import { AuthSignUp } from '@/pages/auth/ui/sign-up';
import { AuthSignUpPasskey } from '@/pages/auth/ui/sign-up-passkey';

import { fetchMockSetUp } from '@/entities/fetch/mock/utils';
import { routes } from '@/entities/routes/utils';

import './global.css';

fetchMockSetUp();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        element={<Navigate to={routes.auth.path} replace />}
                    />
                    <Route path={routes.auth.path} element={<AuthLayout />}>
                        <Route
                            index
                            element={
                                <Navigate
                                    to={routes.auth['sign-in'].path}
                                    replace
                                />
                            }
                        />
                        <Route path={routes.auth['sign-in'].path}>
                            <Route
                                index
                                element={
                                    <Navigate
                                        to={routes.auth['sign-in'].code.path}
                                        replace
                                    />
                                }
                            />
                            <Route
                                path={routes.auth['sign-in'].code.path}
                                element={<AuthSignIn />}
                            />
                            <Route
                                path={
                                    routes.auth['sign-in']['code-verification']
                                        .path
                                }
                                element={<AuthSignInVerify />}
                            />
                            <Route
                                path={routes.auth['sign-in']['password'].path}
                                element={<AuthSignInPassword />}
                            />
                        </Route>
                        <Route
                            path={routes.auth['success'].path}
                            element={<AuthSuccess />}
                        />
                        <Route
                            path={routes.auth['sign-up'].path}
                            element={<AuthSignUp />}
                        />
                        <Route
                            path={routes.auth['sign-up-passkey'].path}
                            element={<AuthSignUpPasskey />}
                        />
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to={routes['auth'].path} replace />}
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
