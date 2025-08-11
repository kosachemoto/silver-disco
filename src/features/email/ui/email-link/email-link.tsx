import type { LinkProps } from '@tanstack/react-router';
import clsx from 'clsx';
import React from 'react';

import { Link } from '@/shared/ui/link';

import { ReactComponent as PencilSquare } from '@/assets/svg/pencil-square.svg';

import styles from './email-link.module.css';

type TProps = {
    email: string;
    className?: string;
} & LinkProps;

export const EmailLink: React.FC<TProps> = ({ email, ...props }) => {
    return (
        <Link {...props} className={clsx(styles.root, props.className)}>
            {email}
            <PencilSquare />
        </Link>
    );
};
