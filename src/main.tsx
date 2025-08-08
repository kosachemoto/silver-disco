import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthCodeRequest } from '@/pages/auth/ui/auth-code-request';
import { AuthCodeVerify } from '@/pages/auth/ui/auth-code-verify';
import { AuthLogin } from '@/pages/auth/ui/auth-login';
import { AuthSuccess } from '@/pages/auth/ui/auth-success';

import { LoginLayout } from '@/widgets/login/ui/login-layout';
import { RootLayout } from '@/widgets/root/ui/root-layout';

import './global.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route index element={<Navigate to="auth" replace />} />
                    <Route path="auth" element={<LoginLayout />}>
                        <Route
                            index
                            element={<Navigate to="code-request" replace />}
                        />
                        <Route
                            path="code-request"
                            element={<AuthCodeRequest />}
                        />
                        <Route
                            path="code-verify"
                            element={<AuthCodeVerify />}
                        />
                        <Route path="login" element={<AuthLogin />} />
                        <Route path="success" element={<AuthSuccess />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
