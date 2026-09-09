import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from '@/shared/ui/Modal';
import {selectChannels, setActiveChannelId} from '@/entities/channel';
import {createChannelSchema} from '../model/validation';
import cls from './CreateChannelModal.module.scss';
import {createChannel} from "@/features/createChannel/model/services/createChannel";
import {AppDispatch} from "@/app/store";
import {Button} from "@/shared/ui/Button";
import {useTranslation} from "react-i18next";
import {toast} from 'react-toastify';

interface CreateChannelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateChannelModal = ({isOpen, onClose}: CreateChannelModalProps) => {
    const {t} = useTranslation();
    const channels = useSelector(selectChannels);
    const existingNames = channels.map((channel) => channel.name);

    const {register, handleSubmit, setFocus, reset, setError, formState: {errors, isSubmitting}} = useForm({
        resolver: yupResolver(createChannelSchema(existingNames, t)),
    });

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isOpen) {
            setFocus('name')
        }
    }, [isOpen, setFocus]);

    const onSubmit = async ({name}: { name: string }) => {
        try {
            const createdChannel = await dispatch(createChannel({name})).unwrap();
            dispatch(setActiveChannelId(createdChannel.id));
            reset();
            onClose();
            toast.success(t('toasts.channelCreated'));
        } catch (e) {
            const message = t(typeof e === 'string' ? e : 'errors.channelCreateFailed');
            setError('name', {message});
            toast.error(message);
        }
    };


    return (
        <Modal title={t('channels.create.title')} isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={cls.input}
                       aria-label={t('channels.create.nameLabel')}
                       {...register('name')}
                />
                {errors.name && <p className={cls.errorText}>{errors.name.message}</p>}
                <div className={cls.actions}>
                    <Button type="button" onClick={onClose} className={cls.cancelButton}
                            disabled={isSubmitting}>{t('common.cancel')}
                    </Button>
                    <Button type="submit" className={cls.submitButton} disabled={isSubmitting}>
                        {t('channels.create.submit')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
