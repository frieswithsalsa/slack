import {setUser, logout} from "@/entities/user/model/slice/userSlice";
import {selectUserName, selectIsAuthed} from './model/selectors/selectors';
import {UserState} from "@/entities/user/model/types/types";

export {
    setUser,
    logout,
    selectIsAuthed,
    selectUserName,
    type UserState
}