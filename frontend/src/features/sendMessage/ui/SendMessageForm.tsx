import {classNames} from "@/shared/lib/classNames";
import cls from './SendMessageForm.module.scss'
import {SendHorizontal} from "lucide-react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectActiveChannelId} from "@/entities/channel";
import {selectUserName} from "@/entities/user";
import {sendMessage} from "@/features/sendMessage/model/services/sendMessage";
import {AppDispatch} from "@/app/store";
import {useTranslation} from "react-i18next";
import {profanityFilter} from "@/shared/lib/profanityFilter";

interface SendMessageFormProps {
    className?: string;
}

export const SendMessageForm = ({className}: SendMessageFormProps) => {
    const {t} = useTranslation();

    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSending, setIsSending] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>()

    const activeChannelId = useSelector(selectActiveChannelId);
    const username = useSelector(selectUserName);


    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formattedMessage = profanityFilter.clean(message.trim())

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
            await dispatch(sendMessage(newMessage)).unwrap()
            setMessage('');
            setError(null);
        } catch (e) {
            setError(t(typeof e === 'string' ? e : 'errors.messageSendFailed'))
        } finally {
            setIsSending(false);
        }

    }


    return (
        <form onSubmit={onSubmit}
              className={classNames(cls.messageForm, {}, [className])}
        >
            <div className={cls.inputWrapper}>
                <input placeholder={t('messages.inputPlaceholder')}
                       type="text"
                       className={cls.messageInput}
                       onChange={onChange}
                       value={message}/>
                <button
                    disabled={isSending}
                    aria-label={t('messages.send')}
                    className={cls.sendButton}
                    type="submit">
                    <SendHorizontal size={20} strokeWidth={1.75}/>
                </button>
            </div>
            {error && <p className={cls.errorText}>{error}</p>}
        </form>
    );
};
