import type { Alert } from '@/shared/ui/alert';

import type { ApiError } from '@/entities/api-error/utils';

type AlertType = React.ComponentProps<typeof Alert>;

export const convertApiErrorToProps = ({ message }: ApiError): AlertType => ({
    children: message,
});
