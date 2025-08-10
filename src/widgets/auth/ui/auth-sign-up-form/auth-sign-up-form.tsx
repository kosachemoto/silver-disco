import { zodResolver } from '@hookform/resolvers/zod';
import noop from 'lodash/noop';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { DefaultValues, SubmitHandler } from 'react-hook-form';

import { Email } from '@/features/email/ui';

import { Button } from '@/shared/ui/button';

import type { TAuthSignUp } from '@/entities/auth/types';
import { authSignUpSchema } from '@/entities/auth/utils';

type TProps = {
    onSubmit?: SubmitHandler<TAuthSignUp>;
    onError?: SubmitHandler<TAuthSignUp>;
    defaultValues?: DefaultValues<TAuthSignUp>;
    isLoading?: boolean;
};

export const AuthSignUpForm: React.FC<TProps> = ({
    onSubmit = noop,
    onError = noop,
    defaultValues,
    isLoading,
}) => {
    const { register, formState, handleSubmit } = useForm<TAuthSignUp>({
        resolver: zodResolver(authSignUpSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Email
                {...register('email')}
                autoFocus
                title="Email"
                error={formState.errors.email?.message}
            />
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
                Continue
            </Button>
        </form>
    );
};
