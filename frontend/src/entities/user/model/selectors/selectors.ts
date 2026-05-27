import {UserState} from '../types/types';

interface UserRootState {
    user: UserState;
}

export const selectUserName = (state: UserRootState) => state.user.name;
export const selectIsAuthed = (state: UserRootState) => state.user.isAuthed;