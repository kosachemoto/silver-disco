import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { LoginEmail } from '@/pages/login-email/ui';
import { LoginPassword } from '@/pages/login-password/ui';

import { LoginLayout } from '@/widgets/login/ui/login-layout';
import { RootLayout } from '@/widgets/root/ui/root-layout';

import './global.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<LoginLayout />}>
                        <Route
                            index
                            element={<Navigate to="email" replace />}
                        />
                        <Route path="email" element={<LoginEmail />} />
                        <Route path="password" element={<LoginPassword />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
