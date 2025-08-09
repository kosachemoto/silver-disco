import { zodResolver } from '@hookform/resolvers/zod';
import noop from 'lodash/noop';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { DefaultValues, SubmitHandler } from 'react-hook-form';

import { Email } from '@/features/email/ui';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';

import type { TAuthCodeRequest } from '@/entities/auth/types';
import { authCodeRequestSchema } from '@/entities/auth/utils';

type TProps = {
    onSubmit?: SubmitHandler<TAuthCodeRequest>;
    onError?: SubmitHandler<TAuthCodeRequest>;
    defaultValues?: DefaultValues<TAuthCodeRequest>;
    isLoading?: boolean;
};

export const AuthSignInForm: React.FC<TProps> = ({
    onSubmit = noop,
    onError = noop,
    defaultValues,
    isLoading,
}) => {
    const { register, formState, handleSubmit } = useForm<TAuthCodeRequest>({
        resolver: zodResolver(authCodeRequestSchema),
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
            <Checkbox {...register('remember')}>Remember me</Checkbox>
            <Button type="submit" isLoading={isLoading}>
                Continue
            </Button>
        </form>
    );
};
