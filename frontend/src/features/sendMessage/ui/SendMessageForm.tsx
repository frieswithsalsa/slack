import {classNames} from "@/shared/lib/classNames";
import cls from './SendMessageForm.module.scss'
import {SendHorizontal} from "lucide-react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveChannelId} from "@/entities/channel";
import {selectUserName} from "@/entities/user";
import {sendMessage} from "@/features/sendMessage/model/services/sendMessage";
import {addMessage} from "@/entities/message";
import {AppDispatch} from "@/app/store";

interface SendMessageFormProps {
    className?: string;
}

export const SendMessageForm = ({className}: SendMessageFormProps) => {

    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const activeChannelId = useSelector(selectActiveChannelId);
    const username = useSelector(selectUserName);

    const dispatch = useDispatch<AppDispatch>();

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formattedMessage = message.trim()

        if (formattedMessage.length === 0) {
            return
        }

        if (!activeChannelId) {
            return;
        }

        if (username.length === 0) {
            return;
        }

        const newMessage = {
            body: formattedMessage,
            channelId: activeChannelId,
            username
        }


        try {
            const createdMessage = await sendMessage(newMessage);
            dispatch(addMessage(createdMessage));
            setMessage('');
            setError(null);
        } catch (error) {
            setError('Не удалось отправить сообщение')
        }

    }


    return (
        <form onSubmit={onSubmit}
              className={classNames(cls.messageForm, {}, [className])}
        >
            <div className={cls.inputWrapper}>
                <input placeholder="Введите сообщение..."
                       type="text"
                       className={cls.messageInput}
                       onChange={onChange}
                       value={message}/>
                <button aria-label="Отправить сообщение" className={cls.sendButton} type="submit">
                    <SendHorizontal size={30} strokeWidth={0.75}/>
                </button>
            </div>
        </form>
    );
};

