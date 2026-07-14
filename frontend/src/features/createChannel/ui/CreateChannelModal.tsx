import {Modal} from '@/shared/ui/Modal';
import cls from './CreateChannelModal.module.scss';

interface CreateChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateChannelModal = ({isOpen, onClose}: CreateChannelModalProps) => {
    return (
        <Modal title="Создать канал" isOpen={isOpen} onClose={onClose}>
            <form>
                <input className={cls.input}/>
                <div className={cls.actions}>
                    <button type="button" onClick={onClose} className={cls.cancelButton}>Отменить</button>
                    <button type="submit" className={cls.submitButton}>Создать</button>
                </div>
            </form>
        </Modal>
    );
};