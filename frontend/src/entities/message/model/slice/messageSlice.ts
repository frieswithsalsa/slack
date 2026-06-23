import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Message, MessageState} from "@/entities/message/model/types/types";

const initialState: MessageState = {
    items: [],
    isLoading: false,
    error: null,
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.items = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.items.push(action.payload);
        }
    },
});


export const {setMessages, addMessage} = messageSlice.actions;

export default messageSlice.reducer;