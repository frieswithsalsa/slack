import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Message, MessageState} from "@/entities/message/model/types/types";
import {fetchMessages} from "@/entities/message/model/services/fetchMessages";
import {channelRemoved} from "@/entities/channel";

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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Не удалось запросить список сообщений';
            })
            .addCase(channelRemoved, (state, action) => {
                state.items = state.items.filter(item => item.channelId !== action.payload)
            })
    }
});


export const {setMessages, addMessage} = messageSlice.actions;

export default messageSlice.reducer;