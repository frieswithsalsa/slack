import {classNames} from "@/shared/lib/classNames";
import cls from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: React.ReactNode;
}

export const Button = ({className, children, ...otherProps}: ButtonProps) => {
    return (
        <button type="button" {...otherProps} className={classNames(cls.Button, {}, [className])}>
            {children}
        </button>
    );
};