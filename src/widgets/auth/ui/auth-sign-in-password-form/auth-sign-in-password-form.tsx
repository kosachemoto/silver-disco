import { zodResolver } from '@hookform/resolvers/zod';
import noop from 'lodash/noop';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

import { Email } from '@/features/email/ui';
import { Password } from '@/features/password/ui';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';

import type { TAuthLogin } from '@/entities/auth/types';
import { authLoginSchema } from '@/entities/auth/utils';

type TProps = {
    onSubmit?: SubmitHandler<TAuthLogin>;
    onError?: SubmitErrorHandler<Error>;
    isLoading?: boolean;
};

export const AuthSignInPasswordForm: React.FC<TProps> = ({
    onSubmit = noop,
    onError = noop,
    isLoading,
}) => {
    const { register, formState, handleSubmit } = useForm({
        resolver: zodResolver(authLoginSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Email
                {...register('email')}
                title="Email"
                autoFocus
                autoComplete="email webauthn"
                error={formState.errors.email?.message}
            />
            <Password
                {...register('password')}
                title="Password"
                error={formState.errors.password?.message}
            />
            <Checkbox {...register('remember')}>Remember me</Checkbox>
            <Button type="submit" isLoading={isLoading}>
                Sign In
            </Button>
        </form>
    );
};
