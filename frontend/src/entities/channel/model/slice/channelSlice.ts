import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Channel, ChannelState} from "@/entities/channel/model/types/types";
import {fetchChannels} from "@/entities/channel/model/services/fetchChannels";
import {DEFAULT_CHANNEL_ID} from "@/entities/channel/model/consts/consts";

const initialState: ChannelState = {
    items: [],
    activeChannelId: null,
    isLoading: false,
    fetchError: null,
}

const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers: {
        setActiveChannelId: (state, action: PayloadAction<string | null>) => {
            state.activeChannelId = action.payload;
        },
        addChannel: (state, action: PayloadAction<Channel>) => {
            state.items.push(action.payload);
        },
        channelRemoved: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            if (state.activeChannelId === action.payload) {
                state.activeChannelId = DEFAULT_CHANNEL_ID;
            }
        },
        channelRenamed: (state, action: PayloadAction<Channel>) => {
            const index = state.items.findIndex(channel => channel.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.pending, (state) => {
                state.isLoading = true;
                state.fetchError = null;
            })
            .addCase(fetchChannels.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.activeChannelId = action.payload[0]?.id ?? null;
            })
            .addCase(fetchChannels.rejected, (state, action) => {
                state.isLoading = false;
                state.fetchError =
                    action.payload ?? 'errors.channelsLoadFailed';
            });
    }
});


export const {setActiveChannelId, addChannel, channelRemoved, channelRenamed} = channelSlice.actions;

export default channelSlice.reducer;
