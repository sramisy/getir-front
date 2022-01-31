import { v4 as uuidv4 } from 'uuid';

export const users = [
    {
        id: uuidv4(),
        firstName: 'Ramis',
        lastName: 'Samadov',
        fullName: 'Ramis Samadov',
        phone: '+9940519101336',
        email: 'sr.alright@gmail.com',
        password: '12345678',
        active: false,
        country: 'Azerbaijan',
        addresses: [],
        favorites: [],
    },
];