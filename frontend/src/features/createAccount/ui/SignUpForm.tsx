import {classNames} from "@/shared/lib/classNames";
import cls from "./RegisterForm.module.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {useNavigate} from "react-router-dom";
import {SubmitHandler} from "react-hook-form";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store";
import {SignUpFormData} from "@/features/createAccount/model/types";
import {createAccountSchema} from "@/features/createAccount/model/validation";
import {createAccount} from "@/features/createAccount/model/services/createAccount";
import {useTranslation} from "react-i18next";

interface RegisterFormProps {
    className?: string;
}

export const SignUpForm = ({className}: RegisterFormProps) => {
    const {t} = useTranslation();
    const [authError, setAuthError] = useState<string | null>(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignUpFormData>({
        resolver: yupResolver(createAccountSchema([], t)),
    });

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
        const {newUsername: username, newPassword: password} = data;

        try {

            await dispatch(createAccount({username, password})).unwrap();
            navigate("/");
        } catch (e) {
            if (e) {
                setAuthError(
                    t(typeof e === "string" ? e : "errors.signupFailed"),
                );
            }
        }
    };

    return (
        <div className={classNames(cls.RegisterForm, {}, [className])}>
            <div className={classNames(cls.formTitle, {}, [])}>{t('auth.signup.title')}</div>
            <form
                className={classNames(cls.form, {}, [])}
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    placeholder={t('auth.signup.usernamePlaceholder')}
                    {...register("newUsername")}
                    className={classNames(
                        cls.formInput,
                        {[cls.inputError]: !!errors.newUsername},
                        [],
                    )}
                />
                {errors.newUsername && (
                    <p className={cls.errorText}>{errors.newUsername.message}</p>
                )}
                <input
                    placeholder={t('auth.signup.passwordPlaceholder')}
                    type={"password"}
                    {...register("newPassword")}
                    className={classNames(
                        cls.formInput,
                        {[cls.inputError]: !!errors.newPassword},
                        [],
                    )}
                />
                {errors.newPassword && (
                    <p className={cls.errorText}>{errors.newPassword.message}</p>
                )}
                <input
                    placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                    type={"password"}
                    {...register("confirmNewPassword")}
                    className={classNames(
                        cls.formInput,
                        {[cls.inputError]: !!errors.confirmNewPassword},
                        [],
                    )}
                />
                {errors.confirmNewPassword && (
                    <p className={cls.errorText}>{errors.confirmNewPassword.message}</p>
                )}
                <input type="submit" value={t('auth.signup.submit')}/>
                {authError && <p className={cls.errorText}>{authError}</p>}
            </form>
        </div>
    );
};
