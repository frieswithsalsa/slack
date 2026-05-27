import {createSlice, type PayloadAction} from '@reduxjs/toolkit'
import {UserState} from '../types/types'

const initialState: UserState = {
    name: '',
    isAuthed: false,
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
        },
    }
})

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;