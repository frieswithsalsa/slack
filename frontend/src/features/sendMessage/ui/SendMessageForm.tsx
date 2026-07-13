import {classNames} from "@/shared/lib/classNames";
import cls from './SendMessageForm.module.scss'
import {SendHorizontal} from "lucide-react";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectActiveChannelId} from "@/entities/channel";
import {selectUserName} from "@/entities/user";
import {sendMessage} from "@/features/sendMessage/model/services/sendMessage";

interface SendMessageFormProps {
    className?: string;
}

export const SendMessageForm = ({className}: SendMessageFormProps) => {

    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSending, setIsSending] = useState<boolean>(false);

    const activeChannelId = useSelector(selectActiveChannelId);
    const username = useSelector(selectUserName);


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

        setIsSending(true);


        try {
            await sendMessage(newMessage);
            setMessage('');
            setError(null);
        } catch (e) {
            setError('Не удалось отправить сообщение')
        } finally {
            setIsSending(false);
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
                <button
                    disabled={isSending}
                    aria-label="Отправить сообщение"
                    className={cls.sendButton}
                    type="submit">
                    <SendHorizontal size={30} strokeWidth={0.75}/>
                </button>
            </div>
            {error && <p className={cls.errorText}>{error}</p>}
        </form>
    );
};

