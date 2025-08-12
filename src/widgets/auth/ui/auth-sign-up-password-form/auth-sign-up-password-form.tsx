import { zodResolver } from '@hookform/resolvers/zod';
import noop from 'lodash/noop';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { DefaultValues, SubmitHandler } from 'react-hook-form';

import { Email } from '@/features/email/ui';
import { Password } from '@/features/password/ui';

import { Button } from '@/shared/ui/button';

import type { TAuthSignUpPassword } from '@/entities/auth/types';
import { authSignUpPasswordSchema } from '@/entities/auth/utils';

type TProps = {
    onSubmit?: SubmitHandler<TAuthSignUpPassword>;
    onError?: SubmitHandler<TAuthSignUpPassword>;
    defaultValues?: DefaultValues<TAuthSignUpPassword>;
    propsButton?: React.ComponentProps<typeof Button>;
    isLoading?: boolean;
};

export const AuthSignUpPasswordForm: React.FC<TProps> = ({
    onSubmit = noop,
    onError = noop,
    defaultValues,
    propsButton,
    isLoading,
}) => {
    const { register, formState, handleSubmit } = useForm<TAuthSignUpPassword>({
        resolver: zodResolver(authSignUpPasswordSchema),
        defaultValues,
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
                autoComplete="current-password webauthn"
                error={formState.errors.password?.message}
            />
            <Button
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                {...propsButton}
            />
        </form>
    );
};
