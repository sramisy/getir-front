import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

let userId = null;
let items = [];

if (localStorage.getItem('isAuth')) {
    userId = JSON.parse(localStorage.getItem('user')).id;
    items = JSON.parse(localStorage.getItem('favorite')).items || [];
}

const initialState = {
    userId,
    items,
};

export const addFavorite = createAsyncThunk(
    'favorite/addFavorite',
    async (favorite) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(favorite),
        };

        const response = await fetch('/api/add-favorite', config);
        return await response.json();
    }
);

export const removeFavorite = createAsyncThunk(
    'favorite/removeFavorite',
    async (favoriteId, {
        dispatch
    }) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(favoriteId),
        };

        const response = await fetch('/api/remove-favorite', config);
        return await response.json();
    }
);

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(addFavorite.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.items.push(action.payload.item);
                }

            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.favoriteId);
            })

    }
});


export const selectFavoriteById = (state, id) => state.favorite.items.find(item => item.id === id);


export default favoriteSlice.reducer;