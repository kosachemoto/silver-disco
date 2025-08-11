import { zodResolver } from '@hookform/resolvers/zod';
import noop from 'lodash/noop';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { DefaultValues, SubmitHandler } from 'react-hook-form';

import { Email } from '@/features/email/ui';

import { Button } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { TAuthSignUpPasskey } from '@/entities/auth/types';
import { authSignUpPasskeySchema } from '@/entities/auth/utils';

type TProps = {
    onSubmit?: SubmitHandler<TAuthSignUpPasskey>;
    onError?: SubmitHandler<TAuthSignUpPasskey>;
    defaultValues?: DefaultValues<TAuthSignUpPasskey>;
    propsButton?: React.ComponentProps<typeof Button>;
    isLoading?: boolean;
};

export const AuthSignUpPasskeyForm: React.FC<TProps> = ({
    onSubmit = noop,
    onError = noop,
    defaultValues,
    propsButton = {
        children: 'Continue with Passkey',
    },
    isLoading,
}) => {
    const { register, formState, handleSubmit } = useForm<TAuthSignUpPasskey>({
        resolver: zodResolver(authSignUpPasskeySchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Field
                title="Display Name"
                input={
                    <Input
                        autoFocus
                        autoComplete="name"
                        {...register('displayName')}
                    />
                }
                error={formState.errors.displayName?.message}
            />
            <Email
                {...register('email')}
                title="Email"
                error={formState.errors.email?.message}
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
