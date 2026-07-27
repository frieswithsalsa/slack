import * as yup from 'yup';

export const createChannelSchema = (existingNames: string[]) =>
    yup.object({
        name: yup.string()
            .trim()
            .required('Обязательное поле')
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .notOneOf(existingNames, 'Канал с таким именем уже существует'),
    });
