import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';


let user = null;
let isAuth = false;

if (localStorage.getItem('isAuth')) {
    isAuth = true;
    user = JSON.parse(localStorage.getItem('user'));
}


const initialState = {
    isAuth: isAuth,
    user: user
    /* {
           id: nanoid(),
           firstName: 'Ramis',
           lastName: 'Samadov',
           fullName: 'Ramis Samadov',
           phoneNumber: '+9940519101336',
           email: 'sr.alright@gmail.com',
           password: '12345678',
           active: false,
           country: 'Turkey',
           favorites: [],
           addresses: [
               {
                   id: nanoid(),
                   icon: 'home',
                   title: 'Home',
                   street: 'Alemdar Cad.',
                   building: '',
                   floor: '',
                   apartment: '',
                   direction: '',
                   available: false,
                   active: true,
                   eta: '14 min',
               },
               {
                   id: nanoid(),
                   icon: 'plaza',
                   title: 'Business',
                   street: 'Alemdar Cad.',
                   building: '',
                   floor: '',
                   apartment: '',
                   direction: '',
                   available: true,
                   active: false,
                   eta: '14 min',
               },
           ]
       }, */
};

export const signup = createAsyncThunk(
    'auth/signup',
    async (data) => {

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch('/signup', config);
        return await response.json();
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        const config = {
            method: 'POST',
        };

        const response = await fetch('/logout', config);
        return await response.json();
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (data) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch('/login', config);
        return await response.json();
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (data) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch('/api/update-profile', config);
        return await response.json();
    }
)

export const activate = createAsyncThunk(
    'auth/activate',
    async (data) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch('/activate', config);
        return await response.json();
    }
)

export const otpCheck = createAsyncThunk(
    'auth/otp-check',
    async (data) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch('/otp-check', config);
        return await response.json();
    }
)

export const addAddress = createAsyncThunk(
    'auth/add-address',
    async (data) => {
        console.log(data);
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        const response = await fetch('/api/add-address', config);
        return await response.json();
    }
);

export const updateCurrentAddress = createAsyncThunk(
    'auth/update-current-address',
    async (id) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        };

        const response = await fetch('/api/update-current-address', config);
        return await response.json();
    }
)

export const removeAddress = createAsyncThunk(
    'auth/remove-address',
    async (id) => {
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(id),
        };

        const response = await fetch('/api/remove-address', config);
        return await response.json();
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(logout.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isAuth = false;
                    state.user = null;
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.user = action.payload.user;
                }
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.user = action.payload.user;
                }
            })
            .addCase(activate.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.user = action.payload.user;
                }
            })
            .addCase(otpCheck.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isAuth = true;
                    state.user = action.payload.user;
                }
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const currentAddress = state.user.addresses.find(address => address.active);
                    if (currentAddress) {
                        currentAddress.active = false;
                    }

                    state.user.addresses.push(action.payload.address);
                    state.user.addresses.sort((first, second) => {
                        return (first.active === second.active) ? 0 : (first.active ? -1 : 1);
                    })
                }
            })
            .addCase(updateCurrentAddress.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const currentAddress = state.user.addresses.find(address => address.active);
                    if (currentAddress) currentAddress.active = false;
                    const addressToBeActive = state.user.addresses.find(address => address.id === action.payload.id);
                    if (addressToBeActive) addressToBeActive.active = true;

                    state.user.addresses.sort((first, second) => {
                        return (first.active === second.active) ? 0 : (first.active ? -1 : 1);
                    })
                }
            })
            .addCase(removeAddress.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const addressToBeRemoved = state.user.addresses.find(address => address.id === action.payload.id);
                    if (addressToBeRemoved) {
                        const index = state.user.addresses.indexOf(addressToBeRemoved);
                        state.user.addresses.splice(index, 1);
                    }
                }
            });
    }
});


export const selectActiveAddress = (state) => state.auth.user.addresses.find(item => item.active === true);

export default authSlice.reducer;