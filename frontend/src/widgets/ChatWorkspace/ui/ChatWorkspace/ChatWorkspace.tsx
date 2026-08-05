import {classNames} from "@/shared/lib/classNames";
import cls from './ChatWorkspace.module.scss'
import {ChannelsPanel} from "@/widgets/ChatWorkspace/ui/ChannelsPanel/ChannelsPanel";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store";
import {useEffect} from "react";
import {fetchChannels} from "@/entities/channel/model/services/fetchChannels";
import {ChatPanel} from "@/widgets/ChatWorkspace/ui/ChatPanel/ChatPanel";
import {fetchMessages} from "@/entities/message/model/services/fetchMessages";
import {socket} from '@/shared/api/socket';
import {addMessage, MessageType} from "@/entities/message";
import {addChannel, channelRemoved, channelRenamed, Channel} from "@/entities/channel";


interface ChatWorkspaceProps {
    className?: string;
}


export const ChatWorkspace = ({className}: ChatWorkspaceProps) => {

    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {

        const handleNewMessage = (payload: MessageType) => {
            dispatch(addMessage(payload));
        }

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [dispatch]);

    useEffect(() => {

        const handleNewChannel = (payload: Channel) => {
            dispatch(addChannel(payload));
        }
        socket.on('newChannel', handleNewChannel);

        return () => {
            socket.off('newChannel', handleNewChannel);
        }
    }, [dispatch]);

    useEffect(() => {
        const handleRemoveChannel = (payload: Channel) => {
            dispatch(channelRemoved(payload.id))
        }
        socket.on('removeChannel', handleRemoveChannel);

        return () => {
            socket.off('removeChannel', handleRemoveChannel);
        }
    }, [dispatch]);

    useEffect(() => {
        const handleRenameChannel = (payload: Channel) => {
            dispatch(channelRenamed(payload))
        }
        socket.on('renameChannel', handleRenameChannel);

        return () => {
            socket.off('renameChannel', handleRenameChannel);
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);


    return (
        <div className={classNames(cls.ChatWorkspace, {}, [className])}>
            <ChannelsPanel/>
            <ChatPanel/>
        </div>
    );
};

