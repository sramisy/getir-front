import {
    rest
} from "msw";
import {
    v4 as uuidv4
} from "uuid";

import {
    categories
} from "../db/categories";

import {
    favorites
} from "../db/favorites";

import {
    searches
} from "../db/searches";


export const handlers = [
    rest.get("/api/categories", (req, res, ctx) => {

        const category = req.url.searchParams.get('category');

        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json(
                category ? categories.find(c => c.slug === category) : categories
            ),
        )
    }),

    rest.get("/api/categories/:id", (req, res, ctx) => {

    }),

    rest.get('/api/favorites', (req, res, ctx) => {

        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json(favorites),
        )
    }),

    rest.get('/api/popular-searches', (req, res, ctx) => {
        const popularSearches = ['water', 'ice cream', 'milk', 'bread', 'eggs', 'yoghurt', 'coffee', 'cheese', 'crisps'];

        return res(
            ctx.status(200),
            ctx.json(popularSearches),
        )
    }),

    rest.get('/api/search', (req, res, ctx) => {
        const query = req.url.searchParams.get('q');

        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json(searches),
        )
    }),

    rest.get('/api/basket', (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json(JSON.parse(localStorage.getItem('basket'))),
        )
    }),

    rest.post(`/api/basket/add`, (req, res, ctx) => {
        const product = req.body;

        const basket = JSON.parse(localStorage.getItem('basket'));

        const item = basket.items.find((item) => item.id === product.id);

        if (item) {
            item.count += product.count;
        } else {
            basket.items.push(product);
        }

        basket.total += product.price.current * product.count;

        localStorage.setItem('basket', JSON.stringify(basket));

        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json({
                success: true,
                product,
            }),
        )

    }),

    rest.post('/api/basket/update', (req, res, ctx) => {
        const product = req.body;

        const basket = JSON.parse(localStorage.getItem('basket'));

        const item = basket.items.find((item) => item.id === product.id);

        basket.total += (product.count - item.count) * item.price.current;
        item.count = product.count;

        localStorage.setItem('basket', JSON.stringify(basket));

        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json({
                success: true,
                product,
            }),
        )
    }),

    rest.post('/api/basket/remove', (req, res, ctx) => {
        const {
            id
        } = req.body;

        const basket = JSON.parse(localStorage.getItem('basket'));

        const item = basket.items.find((item) => item.id === id);

        if (item) {
            if (item.count > 1) {
                item.count--;
            } else {
                basket.items = basket.items.filter((item) => item.id !== id);
            }
        }

        basket.total -= parseFloat(item.price.current);

        localStorage.setItem('basket', JSON.stringify(basket));

        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json({
                success: true,
                id,
            }),
        )
    }),

    rest.delete('/api/basket', (req, res, ctx) => {
        const basket = JSON.parse(localStorage.getItem('basket'));

        basket.items = [];
        basket.total = 0;

        localStorage.setItem('basket', JSON.stringify(basket));

        return res(
            ctx.status(200),
            ctx.json({
                success: true,
                basket,
            }),
        )
    }),

    rest.post("/signup", (req, res, ctx) => {

        const previousUser = JSON.parse(localStorage.getItem('user'));

        if (previousUser) {
            localStorage.clear();
        }

        const user = {
            id: uuidv4(),
            ...req.body,
            active: false,
            addresses: [],
        };

        const basket = {
            userId: user.id,
            items: [],
            total: 0,
        }

        const favorite = {
            userId: user.id,
            items: [],
        }

        localStorage.setItem("isAuth", "true");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("basket", JSON.stringify(basket));
        localStorage.setItem("favorite", JSON.stringify(favorite));

        return res(
            ctx.delay(2000),
            ctx.status(201),
            ctx.json({
                success: true,
                user,
            }),
        )
    }),

    rest.post('/logout', (req, res, ctx) => {
        localStorage.removeItem("isAuth");

        return res(
            ctx.status(200),
            ctx.json({
                success: true,
            })
        )
    }),

    rest.post("/otp-check", (req, res, ctx) => {
        const pinCode = '1234';
        const {
            code
        } = req.body;

        if (pinCode === code) {
            localStorage.setItem("isAuth", "true");

            const user = JSON.parse(localStorage.getItem("user"));

            return res(
                ctx.delay(2000),
                ctx.status(200),
                ctx.json({
                    success: true,
                    user,
                })
            )
        } else {
            return res(
                ctx.delay(2000),
                ctx.status(200),
                ctx.json({
                    success: false,
                })
            )
        }
    }),

    rest.post("/login", (req, res, ctx) => {
        const {
            dialCode,
            phone,
            country,
            countryCode
        } = req.body;

        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user.dialCode === dialCode && user.phone === phone) {

                return res(
                    ctx.delay(2000),
                    ctx.status(200),
                    ctx.json({
                        success: true,
                        user,
                    }),
                )
            }
        }

        sessionStorage.setItem("guest", JSON.stringify({
            dialCode,
            phone,
            country,
            countryCode
        }));

        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json({
                success: false,
            })
        )
    }),

    rest.post('/api/update-profile', (req, res, ctx) => {
        const {
            fullName,
            email
        } = req.body;
        const [firstName, lastName] = fullName.split(' ');

        const user = JSON.parse(localStorage.getItem('user'));

        user.firstName = firstName;
        user.lastName = lastName;
        user.fullName = fullName;
        user.email = email;

        localStorage.setItem('user', JSON.stringify(user));

        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json({
                success: true,
                user,
            }),
        )
    }),

    rest.post("/activate", (req, res, ctx) => {
        const pinCode = '1234';
        const {
            code
        } = req.body;

        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));

            if (pinCode === code) {

                user.active = true;

                localStorage.setItem("user", JSON.stringify(user));

                return res(
                    ctx.delay(2000),
                    ctx.status(200),
                    ctx.json({
                        success: true,
                        user,
                    }),
                )

            } else {
                return res(
                    ctx.delay(2000),
                    ctx.status(200),
                    ctx.json({
                        success: false,
                        message: 'Invalid Code',
                    })
                )
            }
        }
    }),

    rest.post('/api/add-address', (req, res, ctx) => {
        const data = req.body;

        const address = {
            id: uuidv4(),
            ...data,
        }

        const user = JSON.parse(localStorage.getItem('user'));

        if (user.addresses.length > 0) {

            let activeAddress = user.addresses.find(address => {
                return address.active;
            });

            if (activeAddress) {
                activeAddress.active = false;
            }

            user.addresses.push(address);

            user.addresses.sort((first, second) => {
                return (first.active === second.active) ? 0 : (first.active ? -1 : 1);
            })

        } else {
            user.addresses.push(address);

        }

        localStorage.setItem('user', JSON.stringify(user));

        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json({
                success: true,
                address,
            })
        )
    }),

    rest.post('/api/update-current-address', (req, res, ctx) => {
        const id = req.body;

        const user = JSON.parse(localStorage.getItem('user'));

        const currentAddress = user.addresses.find(address => address.active);
        if (currentAddress) currentAddress.active = false;

        const addressToBeActive = user.addresses.find(address => address.id === id);
        if (addressToBeActive) addressToBeActive.active = true;

        user.addresses.sort((first, second) => {
            return (first.active === second.active) ? 0 : (first.active ? -1 : 1);
        })

        localStorage.setItem('user', JSON.stringify(user));

        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json({
                success: true,
                id,
            })
        )
    }),

    rest.delete('/api/remove-address', (req, res, ctx) => {
        const id = req.body;

        const user = JSON.parse(localStorage.getItem('user'));

        const address = user.addresses.find(address => address.id === id);

        user.addresses = user.addresses.filter(address => address.id !== id);

        localStorage.setItem('user', JSON.stringify(user));

        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json({
                success: true,
                address,
            })
        )
    }),

    rest.post('/api/add-favorite', (req, res, ctx) => {
        const item = req.body;

        if (localStorage.getItem('favorite')) {
            const favorite = JSON.parse(localStorage.getItem('favorite'));

            favorite.items.push(item);

            localStorage.setItem('favorite', JSON.stringify(favorite));

        }

        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json({
                success: true,
                item,
            })
        )
    }),

    rest.post('/api/remove-favorite', (req, res, ctx) => {
        const favoriteId = req.body;

        if (localStorage.getItem('favorite')) {
            const favorite = JSON.parse(localStorage.getItem('favorite'));

            const items = favorite.items.filter(item => item.id !== favoriteId);

            const newFavorite = {
                ...favorite,
                items,
            }

            localStorage.setItem('favorite', JSON.stringify(newFavorite));

        }

        return res(
            ctx.delay(1000),
            ctx.status(200),
            ctx.json({
                success: true,
                favoriteId,
            })
        )
    }),

    rest.get('/api/categories/:categoryId', (req, res, ctx) => {
        const {
            categoryId,
        } = req.params;

        const category = categories.find(category => category.id === categoryId);

        return res(
            ctx.status(200),
            ctx.json(
                category,
            )
        )
    })
];