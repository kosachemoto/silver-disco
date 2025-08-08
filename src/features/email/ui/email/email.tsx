import React from 'react';

import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

type TProps = {
    title?: string;
    error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Email: React.FC<TProps> = ({ title, error, ...props }) => {
    return (
        <Field
            title={title}
            input={<Input {...props} type="email" />}
            error={error}
        />
    );
};
