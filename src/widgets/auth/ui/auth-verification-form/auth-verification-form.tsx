import { zodResolver } from '@hookform/resolvers/zod';
import noop from 'lodash/noop';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import type { TProps as TPropsButton } from '@/shared/ui/button';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { TAuthCodeVerify } from '@/entities/auth/types';
import { authCodeVerifySchema } from '@/entities/auth/utils';

type TProps = {
    onSubmit?: SubmitHandler<TAuthCodeVerify>;
    onError?: SubmitHandler<TAuthCodeVerify>;
    propsButton?: TPropsButton;
    isLoading?: boolean;
};

export const AuthVerificationForm: React.FC<TProps> = ({
    onSubmit = noop,
    onError = noop,
    propsButton,
    isLoading,
}) => {
    const { register, formState, handleSubmit } = useForm({
        resolver: zodResolver(authCodeVerifySchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Field
                title="Code"
                input={<Input {...register('code')} autoFocus />}
                error={formState.errors.code?.message}
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
