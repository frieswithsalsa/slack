import cls from './LogoutButton.module.scss';
import {logout} from "@/entities/user";
import {Button} from "@/shared/ui/Button";
import {classNames} from "@/shared/lib/classNames";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";


interface LogoutButtonProps {
    className?: string;
}

export const LogoutButton = ({className, }: LogoutButtonProps) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(logout());
    }

    return (
        <Button onClick={handleClick} className={classNames(cls.LogoutButton, {}, [className])}>
            {t('common.logout')}
        </Button>
    );
};
