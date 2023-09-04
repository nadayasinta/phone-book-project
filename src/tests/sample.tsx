import { Contact } from '../types';

export const contactsSampleData: Contact[] = [...Array(12)].map((_, index) => ({
    id: index + 101,
    first_name: 'User',
    last_name: `${index + 1}`,
    phones: [{ id: index + 1001, number: `088888888${index}` }],
    created_at: '2023-09-01T00:00:00.000000+00:00',
}))