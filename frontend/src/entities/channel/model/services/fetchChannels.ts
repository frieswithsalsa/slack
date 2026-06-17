import axios from "axios";
import {setChannels} from "@/entities/channel/model/slice/channelSlice";
import {AppDispatch} from "@/app/store";
import {Channel} from "@/entities/channel/model/types/types";


export const fetchChannels = async (dispatch: AppDispatch) => {

    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Unable to retrieve token");
    }

    try {
        const response = await axios.get<Channel[]>('/api/v1/channels', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        dispatch(setChannels(response.data));

        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            console.log("Unauthorized.")
            throw new Error("Unauthorized.");
        }
        throw new Error("Something went wrong.")
    }
}