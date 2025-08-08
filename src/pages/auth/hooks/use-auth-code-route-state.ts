import get from 'lodash/get';
import { useLocation } from 'react-router';

type TState = { email?: string };

export const useAuthCodeRouteState = (): TState => {
    const { state } = useLocation();
    const email = get(state, 'email');

    return {
        email,
    };
};
