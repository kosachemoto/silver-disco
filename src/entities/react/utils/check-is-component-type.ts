import React from 'react';

export const checkIsComponentType = (
    element: React.ComponentType | React.ReactNode
): element is React.ComponentType => typeof element === 'function';
