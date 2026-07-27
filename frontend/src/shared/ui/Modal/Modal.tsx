import type {ReactNode} from 'react';
import {X} from 'lucide-react';
import {classNames} from '@/shared/lib/classNames';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({className, title, isOpen, onClose, children}: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={cls.overlay} onClick={onClose}>
            <div
                className={classNames(cls.window, {}, [className])}
                onClick={(e) => e.stopPropagation()}>
                <div className={cls.header}>
                    <h2 className={cls.title}>{title}</h2>
                    <button type="button" onClick={onClose} className={cls.closeButton} aria-label="Закрыть">
                        <X size={30} strokeWidth={1.75}/>
                    </button>
                </div>
                <hr className={cls.thinLine}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};