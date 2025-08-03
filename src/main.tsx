import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { LoginEmail } from '@/pages/login-email/ui';
import { LoginPassword } from '@/pages/login-password/ui';
import { Login } from '@/pages/login/ui';
import { Root } from '@/pages/root/ui';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route element={<Root />}>
                    <Route path="login" element={<Login />}>
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
