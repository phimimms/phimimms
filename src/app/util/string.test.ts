import { toCapitalized } from './string';

describe('util/string', () => {
  test('toCapitalized()', () => {
    expect(toCapitalized('foo')).toBe('Foo');
    expect(toCapitalized('foo bar')).toBe('Foo Bar');

    expect(toCapitalized('')).toBe('');
    expect(toCapitalized(undefined)).toBe(undefined);
    expect(toCapitalized(null)).toBe(null);
  });
});
