import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Channel, ChannelState} from "@/entities/channel/model/types/types";
import {createChannel} from "@/features/createChannel/model/services/createChannel";

const initialState: ChannelState = {
    items: [],
    activeChannelId: null,
    isLoading: false,
    error: null,
}

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setChannels: (state, action: PayloadAction<Channel[]>) => {
            state.items = action.payload;
            state.activeChannelId = action.payload[0]?.id ?? null;
        },

        setActiveChannelId: (state, action: PayloadAction<string | null>) => {
            state.activeChannelId = action.payload;
        },

        addChannel: (state, action: PayloadAction<Channel>) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createChannel.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(createChannel.fulfilled, (state, action) => {
                state.isLoading = false
                state.activeChannelId = action.payload.id
            })
            .addCase(createChannel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'Не удалось создать канал';
            })
    }
});


export const {setChannels, setActiveChannelId, addChannel} = channelSlice.actions;

export default channelSlice.reducer;