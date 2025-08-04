import React from 'react';

import { checkIsComponentType } from './check-is-component-type';

export const toReactNode = (element: React.ComponentType | React.ReactNode) => {
    if (checkIsComponentType(element)) {
        return React.createElement(element);
    }

    return element;
};
