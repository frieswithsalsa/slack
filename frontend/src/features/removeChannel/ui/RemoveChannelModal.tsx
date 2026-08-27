import cls from './RemoveChannelModal.module.scss';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store";
import {useState} from "react";
import {removeChannel} from "@/features/removeChannel/model/services/removeChannel";
import {Modal} from "@/shared/ui/Modal";
import {Button} from "@/shared/ui/Button";
import {useTranslation} from "react-i18next";

interface RemoveChannelModalProps {
    className?: string;
    channelId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RemoveChannelModal = ({className, channelId, onClose, isOpen}: RemoveChannelModalProps) => {
    const {t} = useTranslation();
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const onConfirm = async () => {
        setIsPending(true);
        try {
            await dispatch(removeChannel(channelId)).unwrap();
            onClose()
        } catch (e) {
            setError(t(typeof e === 'string' ? e : 'errors.channelRemoveFailed'));
        } finally {
            setIsPending(false);
        }
    }
    
    return (
        <Modal title={t('channels.removeModal.title')} isOpen={isOpen} onClose={onClose}>
            <p className={cls.message}>{t('channels.removeModal.confirmation')}</p>
            <div className={cls.actions}>
                <Button type="button"
                        onClick={onClose}
                        className={cls.cancelButton}
                        disabled={isPending}
                >
                    {t('common.cancel')}
                </Button>
                <Button
                    type="button"
                    onClick={onConfirm}
                    disabled={isPending}
                    className={cls.removeButton}
                >
                    {t('channels.remove')}
                </Button>
            </div>
            {error && <p className={cls.errorText}>{error}</p>}
        </Modal>
    );
};
