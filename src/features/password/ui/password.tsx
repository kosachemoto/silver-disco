import React from 'react';

import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import styles from './password.module.css';

type TProps = {
    title?: string;
    error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Password: React.FC<TProps> = ({ title, error, ...props }) => {
    const refInput = React.useRef<HTMLInputElement>(null);
    const [reveal, setReveal] = React.useState(false);

    return (
        <Field
            title={title}
            input={
                <div className={styles.wrapper}>
                    <Input
                        ref={refInput}
                        type={reveal ? 'text' : 'password'}
                        {...props}
                    />
                    <Input
                        type="checkbox"
                        checked={reveal}
                        onMouseDown={(event) => {
                            event.preventDefault();
                            refInput.current?.focus();
                        }}
                        onChange={(event) => {
                            setReveal(event.target.checked);
                        }}
                        className={styles.reveal}
                    />
                </div>
            }
            error={error}
        />
    );
};
