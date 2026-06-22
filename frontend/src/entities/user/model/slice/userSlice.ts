import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {UserState} from '../types/types'

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
    }
})

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;