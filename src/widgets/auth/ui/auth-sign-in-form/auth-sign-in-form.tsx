import { zodResolver } from '@hookform/resolvers/zod';
import noop from 'lodash/noop';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { DefaultValues, SubmitHandler } from 'react-hook-form';

import { Email } from '@/features/email/ui';

import { Button } from '@/shared/ui/button';
import type { TProps as TPropsButton } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';

import type { TAuthSignInCodeRequest } from '@/entities/auth/types';
import { authSignInCodeRequestSchema } from '@/entities/auth/utils';

type TProps = {
    onSubmit?: SubmitHandler<TAuthSignInCodeRequest>;
    onError?: SubmitHandler<TAuthSignInCodeRequest>;
    defaultValues?: DefaultValues<TAuthSignInCodeRequest>;
    propsButton?: TPropsButton;
    isLoading?: boolean;
};

export const AuthSignInForm: React.FC<TProps> = ({
    onSubmit = noop,
    onError = noop,
    defaultValues,
    propsButton,
    isLoading,
}) => {
    const { register, formState, handleSubmit } =
        useForm<TAuthSignInCodeRequest>({
            resolver: zodResolver(authSignInCodeRequestSchema),
            defaultValues,
        });

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Email
                {...register('email')}
                autoFocus
                autoComplete="email webauthn"
                title="Email"
                error={formState.errors.email?.message}
            />
            <Checkbox {...register('remember')}>Remember me</Checkbox>
            <Button
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
                {...propsButton}
            />
        </form>
    );
};
