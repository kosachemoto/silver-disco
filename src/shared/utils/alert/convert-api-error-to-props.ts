import type { ApiError } from '@/shared/api/utils';
import type { Alert } from '@/shared/ui/alert';

type AlertType = React.ComponentProps<typeof Alert>;

export const convertApiErrorToProps = ({ message }: ApiError): AlertType => ({
    children: message,
});
