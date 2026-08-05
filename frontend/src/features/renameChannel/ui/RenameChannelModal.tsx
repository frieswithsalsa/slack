import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from '@/shared/ui/Modal';
import {selectChannels} from '@/entities/channel';
import {createChannelSchema} from "@/features/createChannel/model/validation";
import cls from './RenameChannelModal.module.scss';
import {renameChannel} from "@/features/renameChannel/model/services/renameChannel";
import {AppDispatch} from "@/app/store";

interface RenameChannelModalProps {
    channelId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RenameChannelModal = ({isOpen, onClose, channelId}: RenameChannelModalProps) => {
    const channels = useSelector(selectChannels);
    const channel = channels.find((channel) => channel.id === channelId);
    const existingNames = channels.filter((channel) => channel.id !== channelId).map((channel) => channel.name);


    const {register, handleSubmit, setFocus, reset, setError, formState: {errors, isSubmitting}} = useForm({
        resolver: yupResolver(createChannelSchema(existingNames)),
        defaultValues: {name: channel?.name ?? ''}
    });

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isOpen) {
            setFocus('name', {shouldSelect: true});
        }
    }, [isOpen, setFocus]);

    const onSubmit = async ({name}: { name: string }) => {
        try {
            await dispatch(renameChannel({id: channelId, name})).unwrap();
            reset();
            onClose();
        } catch (e) {
            setError('name', {message: typeof e === 'string' ? e : 'Не удалось переименовать канал'});
        }
    };


    return (
        <Modal title="Переименовать канал" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={cls.input}
                       aria-label="Имя канала"
                       {...register('name')}
                />
                {errors.name && <p className={cls.errorText}>{errors.name.message}</p>}
                <div className={cls.actions}>
                    <button type="button" onClick={onClose} className={cls.cancelButton}
                            disabled={isSubmitting}>Отменить
                    </button>
                    <button type="submit" className={cls.submitButton} disabled={isSubmitting}>Переименовать</button>
                </div>
            </form>
        </Modal>
    );
};