import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from '@/shared/ui/Modal';
import {selectChannels} from '@/entities/channel';
import {createChannelSchema} from '../model/validation';
import cls from './CreateChannelModal.module.scss';
import {createChannel} from "@/features/createChannel/model/services/createChannel";
import {AppDispatch} from "@/app/store";

interface CreateChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateChannelModal = ({isOpen, onClose}: CreateChannelModalProps) => {
    const channels = useSelector(selectChannels);
    const existingNames = channels.map((channel) => channel.name);

    const {register, handleSubmit, setFocus, reset, setError, formState: {errors, isSubmitting}} = useForm({
        resolver: yupResolver(createChannelSchema(existingNames)),
    });

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isOpen) {
            setFocus('name')
        }
    }, [isOpen, setFocus]);

    const onSubmit = async ({name}: { name: string }) => {
        try {
            await dispatch(createChannel({name})).unwrap();
            reset();
            onClose();
        } catch (e) {
            setError('name', {message: typeof e === 'string' ? e : 'Не удалось создать канал'});
        }
    };


    return (
        <Modal title="Создать канал" isOpen={isOpen} onClose={onClose}>
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
                    <button type="submit" className={cls.submitButton} disabled={isSubmitting}>Создать</button>
                </div>
            </form>
        </Modal>
    );
};