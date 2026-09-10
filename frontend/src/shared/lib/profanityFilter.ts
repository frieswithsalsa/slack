import filter from 'leo-profanity';

filter.loadDictionary('ru');
filter.add(filter.getDictionary('en'));

export const profanityFilter = {
    clean: (text: string) => filter.clean(text),
    check: (text: string) => filter.check(text),
};