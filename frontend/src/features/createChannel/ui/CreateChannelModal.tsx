import {classNames} from "@/shared/lib/classNames";
import cls from './CreateChannelModal.module.scss'

interface CreateChannelModalProps {
    className?: string;
}

export const CreateChannelModal = ({className}: CreateChannelModalProps) => {

    return (
        <div className={classNames(cls.CreateChannelModal, {}, [className])}>

        </div>
    );
};
