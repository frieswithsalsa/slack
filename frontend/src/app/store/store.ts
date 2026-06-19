import {configureStore} from '@reduxjs/toolkit'
import userReducer from '@/entities/user/model/slice/userSlice';
import channelReducer from '@/entities/channel/model/slice/channelSlice';
import messageReducer from '@/entities/message/model/slice/messageSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        channel: channelReducer,
        message: messageReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;