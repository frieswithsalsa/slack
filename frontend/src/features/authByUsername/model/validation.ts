import type {TFunction} from "i18next";
import * as yup from "yup";

export const createLoginSchema = (t: TFunction) => yup.object({
    username: yup.string().required(t('validation.required')),
    password: yup.string().required(t('validation.required')),
}).required();
