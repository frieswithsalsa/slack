import {classNames} from "@/shared/lib/classNames";
import cls from './LoginForm.module.scss'
import {LoginFormData} from "@/features/AuthByUserName/model/types";
import {useForm, SubmitHandler} from 'react-hook-form'


interface LoginFormProps {
    className?: string;
}


export const LoginForm = ({className}: LoginFormProps) => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm<LoginFormData>();
    const onSubmit: SubmitHandler<LoginFormData> = data => console.log(data);

    console.log(watch("username"))

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
            <form className={classNames(cls.LoginForm, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input defaultValue="test" {...register("username")} />
                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("password", {required: true})} />
                {/* errors will return when field validation fails  */}
                {errors.password && <span>This field is required</span>}
                <input type="submit"/>
            </form>
        </div>
    );
};

