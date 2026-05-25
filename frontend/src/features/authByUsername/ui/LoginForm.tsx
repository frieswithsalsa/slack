import {classNames} from "@/shared/lib/classNames";
import cls from './LoginForm.module.scss'
import {LoginFormData} from "@/features/authByUsername/model/types";
import {useForm, SubmitHandler} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from "@/features/authByUsername/model/validation";


interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({className}: LoginFormProps) => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<LoginFormData> = data => console.log(data);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <div className={classNames(cls.formTitle, {}, [])}>Войти</div>
            <form className={classNames(cls.form, {}, [])} onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder='Your nickname'
                    {...register("username")}
                    className={classNames(cls.formInput, {[cls.inputError]: !!errors.username}, [])}/>
                {errors.username && <p className={cls.errorText}>{errors.username.message}</p>}
                <input
                    placeholder='Your password'
                    {...register("password")}
                    className={classNames(cls.formInput, {[cls.inputError]: !!errors.password}, [])}
                />
                {errors.password && <p className={cls.errorText}>{errors.password.message}</p>}
                <input type="submit"/>
                <p className={cls.signupRow}>
                    Нет аккаунта?
                    <a className={cls.signupLink} href="#">Регистрация</a>
                </p>
            </form>
        </div>
    );
};

