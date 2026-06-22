import {classNames} from "@/shared/lib/classNames";
import cls from './ChatPanel.module.scss'
import {ChatHeader} from "@/widgets/ChatWorkspace/ui/ChatHeader/ChatHeader";
import {useSelector} from "react-redux";
import {Message, selectActiveChannelMessages} from "@/entities/message";
import {SendMessageForm} from "@/features/sendMessage";


interface ChatPanelProps {
    className?: string;
}

export const ChatPanel = ({className}: ChatPanelProps) => {

    const activeChannelMessages = useSelector(selectActiveChannelMessages)

    return (
        <div className={classNames(cls.ChatPanel, {}, [className])}>
            <ChatHeader/>
            <div className={cls.messageArea}>
                {activeChannelMessages.map((message) => (
                    <Message key={message.id} username={message.username} body={message.body}/>
                ))}
            </div>
            <SendMessageForm/>
        </div>
    );
};

