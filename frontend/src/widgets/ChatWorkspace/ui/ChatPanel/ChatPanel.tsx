import {classNames} from "@/shared/lib/classNames";
import cls from './ChatPanel.module.scss'
import {ChatHeader} from "@/widgets/ChatWorkspace/ui/ChatHeader/ChatHeader";
import {SendHorizontal} from 'lucide-react';
import {useSelector} from "react-redux";
import {Message, selectActiveChannelMessages} from "@/entities/message";


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
            <form className={cls.messageForm}>
                <div className={cls.inputWrapper}>
                    <input placeholder="Введите сообщение..." type="text" className={cls.messageInput}/>
                    <button aria-label="Отправить сообщение" className={cls.sendButton} type="submit">
                        <SendHorizontal size={30} strokeWidth={0.75}/>
                    </button>
                </div>
            </form>
        </div>
    );
};

