import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from '../src/pages/root/ui';
import { Login } from '../src/pages/login/ui';
import { LoginEmail } from '../src/pages/login-email/ui';
import { LoginPassword } from '../src/pages/login-password/ui';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router';

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
