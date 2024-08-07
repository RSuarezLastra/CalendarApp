import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        checking: (state) => {
            state.status = 'checking',
                state.user = {},
                state.errorMessage = undefined
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearError: (state) => {
            state.errorMessage = undefined
        }
    },
})

export const { checking, onLogin, onLogout, clearError } = authSlice.actions