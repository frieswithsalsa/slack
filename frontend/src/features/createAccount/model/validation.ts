import * as yup from "yup";

export const createAccountSchema = (existingNames: string[]) => yup.object({
    newUsername: yup.string()
        .trim()
        .required('Обязательное поле')
        .min(3, 'От 3 до 20 символов')
        .max(20, 'От 3 до 20 символов')
        .notOneOf(existingNames, 'Пользователь с таким именем уже существует'),
    newPassword: yup.string()
        .trim()
        .required('Обязательное поле')
        .min(6, 'Пароль не может быть менее 6 символов'),
    confirmNewPassword: yup.string()
        .required('Обязательное поле')
        .min(6, 'Пароль не может быть менее 6 символов')
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
}).required();
