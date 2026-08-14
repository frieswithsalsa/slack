import cls from './LogoutButton.module.scss';
import {logout} from "@/entities/user";
import {Button} from "@/shared/ui/Button";
import {classNames} from "@/shared/lib/classNames";
import {useDispatch} from "react-redux";


interface LogoutButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export const LogoutButton = ({className, children}: LogoutButtonProps) => {
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(logout());
    }

    return (
        <Button label={'Выйти'} onClick={handleClick} className={classNames(cls.LogoutButton, {}, [className])}>
            {children}
        </Button>
    );
};