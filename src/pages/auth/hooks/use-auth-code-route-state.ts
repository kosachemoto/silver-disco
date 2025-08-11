import get from 'lodash/get';
import { useLocation } from 'react-router';

type TState = { from?: string; email?: string };

export const useAuthCodeRouteState = (): TState => {
    const { state } = useLocation();
    const email = get(state, 'email');
    const from = get(state, 'from');

    return {
        email,
        from,
    };
};
