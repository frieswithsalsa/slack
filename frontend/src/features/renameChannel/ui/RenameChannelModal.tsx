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
import {Button} from "@/shared/ui/Button";
import {useTranslation} from "react-i18next";

interface RenameChannelModalProps {
    channelId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RenameChannelModal = ({isOpen, onClose, channelId}: RenameChannelModalProps) => {
    const {t} = useTranslation();
    const channels = useSelector(selectChannels);
    const channel = channels.find((channel) => channel.id === channelId);
    const existingNames = channels.filter((channel) => channel.id !== channelId).map((channel) => channel.name);


    const {register, handleSubmit, setFocus, reset, setError, formState: {errors, isSubmitting}} = useForm({
        resolver: yupResolver(createChannelSchema(existingNames, t)),
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
            setError('name', {message: t(typeof e === 'string' ? e : 'errors.channelRenameFailed')});
        }
    };


    return (
        <Modal title={t('channels.renameModal.title')} isOpen={isOpen} onClose={onClose}>
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
                        {t('channels.renameModal.submit')}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
