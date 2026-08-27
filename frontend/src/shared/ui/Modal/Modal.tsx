import {ReactNode, useEffect} from 'react';
import {X} from 'lucide-react';
import {classNames} from '@/shared/lib/classNames';
import cls from './Modal.module.scss';
import {useTranslation} from "react-i18next";

interface ModalProps {
    className?: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Modal = ({className, title, isOpen, onClose, children}: ModalProps) => {
    const {t} = useTranslation();

    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [isOpen, onClose])

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
                    <button type="button" onClick={onClose} className={cls.closeButton} aria-label={t('common.close')}>
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
