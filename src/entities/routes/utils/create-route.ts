import type { TRoute, TRouteRaw } from '@/entities/routes/types';

import { Route } from './route';

export const createRoute = <T extends TRouteRaw | undefined>(
    path: string,
    routes?: T
): TRoute<T> => {
    const route = new Route(path) as TRoute<T>;

    if (!routes) {
        return route;
    }

    for (const [_path, _routes] of Object.entries(routes)) {
        Object.defineProperty(route, _path, {
            value: createRoute(`${path}/${_path}`, _routes),
        });
    }

    return route;
};
