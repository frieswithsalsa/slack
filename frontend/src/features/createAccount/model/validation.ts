import type {TFunction} from "i18next";
import * as yup from "yup";

export const createAccountSchema = (existingNames: string[], t: TFunction) => yup.object({
    newUsername: yup.string()
        .trim()
        .required(t('validation.required'))
        .min(3, t('validation.nameLength'))
        .max(20, t('validation.nameLength'))
        .notOneOf(existingNames, t('validation.userAlreadyExists')),
    newPassword: yup.string()
        .trim()
        .required(t('validation.required'))
        .min(6, t('validation.passwordMin')),
    confirmNewPassword: yup.string()
        .required(t('validation.required'))
        .min(6, t('validation.passwordMin'))
        .oneOf([yup.ref('newPassword')], t('validation.passwordsMustMatch'))
}).required();
