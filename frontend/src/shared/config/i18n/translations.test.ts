import {describe, expect, it} from 'vitest';

import en from '../../../../public/locales/en/translation.json';
import ru from '../../../../public/locales/ru/translation.json';

const requiredKeys = [
    'app.loading',
    'auth.login.title',
    'auth.login.usernamePlaceholder',
    'auth.login.passwordPlaceholder',
    'auth.login.submit',
    'auth.login.noAccount',
    'auth.login.signupLink',
    'auth.signup.title',
    'auth.signup.usernamePlaceholder',
    'auth.signup.passwordPlaceholder',
    'auth.signup.confirmPasswordPlaceholder',
    'auth.signup.submit',
    'channels.title',
    'channels.add',
    'channels.manage',
    'channels.rename',
    'channels.remove',
    'channels.create.title',
    'channels.create.nameLabel',
    'channels.create.submit',
    'channels.renameModal.title',
    'channels.renameModal.submit',
    'channels.removeModal.title',
    'channels.removeModal.confirmation',
    'common.cancel',
    'common.close',
    'common.logout',
    'messages.count_one',
    'messages.count_few',
    'messages.count_many',
    'messages.count_other',
    'messages.inputPlaceholder',
    'messages.send',
    'notFound.title',
    'notFound.hint',
    'toasts.channelCreated',
    'toasts.channelRenamed',
    'toasts.channelRemoved',
    'toasts.channelCreateFailed',
    'toasts.channelRenameFailed',
    'toasts.channelRemoveFailed',
    'toasts.channelsLoadFailed',
    'validation.required',
    'validation.nameLength',
    'validation.passwordMin',
    'validation.passwordsMustMatch',
    'validation.channelAlreadyExists',
    'validation.userAlreadyExists',
    'errors.authFailed',
    'errors.signupFailed',
    'errors.userAlreadyExists',
    'errors.channelsLoadFailed',
    'errors.channelCreateFailed',
    'errors.channelRenameFailed',
    'errors.channelRemoveFailed',
    'errors.messagesLoadFailed',
    'errors.messageSendFailed',
] as const;

const collectKeys = (value: unknown, prefix = ''): string[] => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        return prefix ? [prefix] : [];
    }

    return Object.entries(value).flatMap(([key, nestedValue]) => {
        const nextPrefix = prefix ? `${prefix}.${key}` : key;
        return collectKeys(nestedValue, nextPrefix);
    });
};

describe('translation resources', () => {
    it('contains all user-facing translation keys in both languages', () => {
        expect(collectKeys(ru)).toEqual(expect.arrayContaining([...requiredKeys]));
        expect(collectKeys(en)).toEqual(expect.arrayContaining([...requiredKeys]));
    });

    it('keeps Russian and English resources in sync', () => {
        expect(collectKeys(ru).sort()).toEqual(collectKeys(en).sort());
    });
});
