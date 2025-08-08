import { fetchMockConfig } from './fetch-mock-config';
import { fetchMockCreate } from './fetch-mock-create';

export const fetchMockSetUp = () => {
    window.fetch = fetchMockCreate(fetchMockConfig);
};
