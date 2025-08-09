import React from 'react';

import styles from './list.module.css';

const List: React.FC<React.PropsWithChildren> & { Item: typeof Item } = ({
    children,
}) => {
    return <ul className={styles.root}>{children}</ul>;
};

const Item: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <li className={styles.item}>{children}</li>;
};

List.Item = Item;

export { List };
