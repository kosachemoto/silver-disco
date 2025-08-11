import type { Route } from '@/entities/routes/utils/route';

import type { TRouteRaw } from './route-raw';

export type TRoute<T extends TRouteRaw | undefined> = Route & {
    [K in keyof T]: TRoute<NonNullable<T>[K]>;
};
