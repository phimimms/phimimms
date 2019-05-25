/**
 * Capitalizes all of the words in the string.
 * @param str The string to capitalize.
 */
export function toCapitalized(str: string): string {
  return str && str.split(' ').map((word: string): string => word && `${word[0].toUpperCase()}${word.slice(1)}`).join(' ');
}
