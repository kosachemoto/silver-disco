import type { Alert } from '@/shared/ui/alert';

import type { ApiError } from '@/entities/api-error/utils';

type AlertType = React.ComponentProps<typeof Alert>;

export const convertApiErrorToProps = (error: ApiError): AlertType => {
    console.error(error);

    return {
        children: error.message,
    };
};
