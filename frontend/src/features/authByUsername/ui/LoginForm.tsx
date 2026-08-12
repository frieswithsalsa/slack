import {classNames} from "@/shared/lib/classNames";
import cls from './LoginForm.module.scss'
import {LoginFormData} from "@/features/authByUsername/model/types";
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import {authByUsername} from "@/features/authByUsername/model/services/authByUsername";
import {schema} from "@/features/authByUsername/model/validation";
import {useNavigate} from "react-router-dom";
import {SubmitHandler} from 'react-hook-form';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({className}: LoginFormProps) => {
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema)
    });

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit: SubmitHandler<LoginFormData> = async (data,) => {
        try {
            await dispatch(authByUsername(data)).unwrap();
            navigate('/')
        } catch (e) {
            if (e) {
                setAuthError(typeof e === 'string' ? e : 'Неверные имя пользователя или пароль');
            }
        }
    }

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
                    type={"password"}
                    placeholder='Your password'
                    {...register("password")}
                    className={classNames(cls.formInput, {[cls.inputError]: !!errors.password}, [])}
                />
                {errors.password && <p className={cls.errorText}>{errors.password.message}</p>}
                <input type="submit"/>
                {authError && <p className={cls.errorText}>{authError}</p>}
                <p className={cls.signupRow}>
                    Нет аккаунта?
                    <a className={cls.signupLink} href="/signup">Регистрация</a>
                </p>
            </form>
        </div>
    );
};

