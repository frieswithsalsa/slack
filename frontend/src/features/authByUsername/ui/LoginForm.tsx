import {classNames} from "@/shared/lib/classNames";
import cls from './LoginForm.module.scss'
import {LoginFormData} from "@/features/authByUsername/model/types";
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup';
import {authByUsername} from "@/features/authByUsername/model/services/authByUsername";
import {createLoginSchema} from "@/features/authByUsername/model/validation";
import {useNavigate} from "react-router-dom";
import {SubmitHandler} from 'react-hook-form';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store";
import {useTranslation} from "react-i18next";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({className}: LoginFormProps) => {
    const {t} = useTranslation();
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormData>({
        resolver: yupResolver(createLoginSchema(t))
    });

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit: SubmitHandler<LoginFormData> = async (data,) => {
        try {
            await dispatch(authByUsername(data)).unwrap();
            navigate('/')
        } catch (e) {
            if (e) {
                setAuthError(t(typeof e === 'string' ? e : 'errors.authFailed'));
            }
        }
    }

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <div className={classNames(cls.formTitle, {}, [])}>{t('auth.login.title')}</div>
            <form className={classNames(cls.form, {}, [])} onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder={t('auth.login.usernamePlaceholder')}
                    {...register("username")}
                    className={classNames(cls.formInput, {[cls.inputError]: !!errors.username}, [])}/>
                {errors.username && <p className={cls.errorText}>{errors.username.message}</p>}
                <input
                    type={"password"}
                    placeholder={t('auth.login.passwordPlaceholder')}
                    {...register("password")}
                    className={classNames(cls.formInput, {[cls.inputError]: !!errors.password}, [])}
                />
                {errors.password && <p className={cls.errorText}>{errors.password.message}</p>}
                <input type="submit" value={t('auth.login.submit')}/>
                {authError && <p className={cls.errorText}>{authError}</p>}
                <p className={cls.signupRow}>
                    {t('auth.login.noAccount')}
                    <a className={cls.signupLink} href="/signup">{t('auth.login.signupLink')}</a>
                </p>
            </form>
        </div>
    );
};
