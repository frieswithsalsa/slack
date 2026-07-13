import type {ReactNode} from 'react';
import {classNames} from '@/shared/lib/classNames';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({className, isOpen, onClose, children}: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={classNames(cls.Modal, {}, [className])}>
            <button type="button" className={cls.overlay} onClick={onClose} aria-label="Закрыть модальное окно"/>
            <div className={cls.content}>
                {children}
            </div>
        </div>
    );
};
