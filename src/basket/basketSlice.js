import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit';

let userId = null;
let items = [];
let total = 0;

if (localStorage.getItem('isAuth')) {
    userId = JSON.parse(localStorage.getItem('user')).id;
    items = JSON.parse(localStorage.getItem('basket')).items || [];
    total = JSON.parse(localStorage.getItem('basket')).total || 0;
}

const initialState = {
    userId,
    items,
    total,
};

export const fetchBasket = createAsyncThunk(
    'basket/fetchBasket',
    async () => {
        const response = await fetch('/api/basket');
        return await response.json();
    }
);

export const clearBasket = createAsyncThunk(
    'basket/clearBasket',
    async () => {
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch('/api/basket', config);
        return await response.json();
    }
);

export const addItem = createAsyncThunk(
    'basket/addItem',
    async (product) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }

        const response = await fetch('/api/basket/add', config);
        return await response.json();
    }
)

export const updateItem = createAsyncThunk(
    'basket/updateItem',
    async (product) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }

        const response = await fetch('/api/basket/update', config);
        return await response.json();
    }
)

export const removeItem = createAsyncThunk(
    'basket/removeItem',
    async (data) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        const response = await fetch('/api/basket/remove', config);
        return await response.json();
    }
);

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchBasket.fulfilled, (state, action) => {
                state.userId = action.payload.userId;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                const {
                    product: item
                } = action.payload;
                const itemIndex = state.items.findIndex((i) => i.id === item.id);

                if (itemIndex === -1) {
                    state.items.push(item);

                } else {
                    state.items[itemIndex].count += item.count;
                }

                state.total += item.price.current * item.count;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const {
                    product
                } = action.payload;
                const item = state.items.find((i) => i.id === product.id);

                if (item) {
                    state.total += (product.count - item.count) * item.price.current;
                    item.count = product.count;
                }
            })
            .addCase(removeItem.fulfilled, (state, action) => {
                const {
                    id
                } = action.payload;
                const itemIndex = state.items.findIndex(item => item.id === id);

                state.total -= state.items[itemIndex].price.current;

                if (state.items[itemIndex].count < 2) {
                    state.items.splice(itemIndex, 1);

                } else {
                    state.items[itemIndex].count--;

                }
            })
            .addCase(clearBasket.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.items = [];
                    state.total = 0;
                }
            })
    }
});


export const selectItemById = (state, id) => state.basket.items.find(item => item.id === id);

export const selectAllItems = (state) => state.basket.items;

export default basketSlice.reducer;