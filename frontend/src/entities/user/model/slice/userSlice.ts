import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {UserState} from '../types/types'
import {authByUsername} from "@/features/authByUsername/model/services/authByUsername";

const initialState: UserState = {
    name: localStorage.getItem('username') ?? '',
    isAuthed: Boolean(localStorage.getItem('authToken')),
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
            state.isAuthed = true;
        },
        logout: (state) => {
            state.name = '';
            state.isAuthed = false;
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authByUsername.pending, (state) => {
                state.isAuthed = false
            })
            .addCase(authByUsername.fulfilled, (state, action) => {
                state.isAuthed = true;
                state.name = action.payload.username;

            })
            .addCase(authByUsername.rejected, (state, action) => {
                state.isAuthed = false;
            })
    }
})

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;