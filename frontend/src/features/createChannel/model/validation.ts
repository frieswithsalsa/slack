import type {TFunction} from 'i18next';
import * as yup from 'yup';

export const createChannelSchema = (existingNames: string[], t: TFunction) =>
    yup.object({
        name: yup.string()
            .trim()
            .required(t('validation.required'))
            .min(3, t('validation.nameLength'))
            .max(20, t('validation.nameLength'))
            .notOneOf(existingNames, t('validation.channelAlreadyExists')),
    });
