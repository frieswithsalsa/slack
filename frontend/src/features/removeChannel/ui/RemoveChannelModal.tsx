import {classNames} from "@/shared/lib/classNames";
import cls from './RemoveChannelModal.module.scss';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store";
import {useState} from "react";
import {removeChannel} from "@/features/removeChannel/model/services/removeChannel";
import {Modal} from "@/shared/ui/Modal";

interface RemoveChannelModalProps {
    className?: string;
    channelId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RemoveChannelModal = ({className, channelId, onClose, isOpen}: RemoveChannelModalProps) => {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const onConfirm = async () => {
        setIsPending(true);
        try {
            await dispatch(removeChannel(channelId)).unwrap();
            onClose()
        } catch (e) {
            setError(typeof e === 'string' ? e : 'Не удалось удалить канал');
        } finally {
            setIsPending(false);
        }
    }


    return (
        <Modal title="Удалить канал" isOpen={isOpen} onClose={onClose}>
            <p className={cls.message}>Уверены?</p>
            <div className={cls.actions}>
                <button type="button"
                        onClick={onClose}
                        className={cls.cancelButton}
                        disabled={isPending}
                >
                    Отменить
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isPending}
                    className={cls.removeButton}
                >
                    Удалить
                </button>
            </div>
            {error && <p className={cls.errorText}>{error}</p>}
        </Modal>
    );
};