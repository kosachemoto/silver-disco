import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthSignInCode } from '@/pages/auth/ui/auth-sign-in-code';
import { AuthSignInCodeVerify } from '@/pages/auth/ui/auth-sign-in-code-verify';
import { AuthSignInPassword } from '@/pages/auth/ui/auth-sign-in-password';
import { AuthSuccess } from '@/pages/auth/ui/auth-success';
import { AuthSignUp } from '@/pages/auth/ui/sign-up';

import { AuthLayout } from '@/widgets/auth/ui/auth-layout';
import { RootLayout } from '@/widgets/root/ui/root-layout';

import { fetchMockSetUp } from '@/entities/fetch/mock/utils';

import './global.css';

fetchMockSetUp();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route
                            index
                            element={<Navigate to="/auth" replace />}
                        />
                        <Route path="auth" element={<AuthLayout />}>
                            <Route
                                index
                                element={<Navigate to="sign-in" replace />}
                            />
                            <Route path="sign-in">
                                <Route
                                    index
                                    element={<Navigate to="code" replace />}
                                />
                                <Route
                                    path="code"
                                    element={<AuthSignInCode />}
                                />
                                <Route
                                    path="code-verification"
                                    element={<AuthSignInCodeVerify />}
                                />
                                <Route
                                    path="password"
                                    element={<AuthSignInPassword />}
                                />
                            </Route>
                            <Route path="success" element={<AuthSuccess />} />
                            <Route path="sign-up" element={<AuthSignUp />} />
                        </Route>
                        <Route
                            path="*"
                            element={<Navigate to="/auth" replace />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
