export function toCapitalized(str: string) {
  return str && `${str[0].toUpperCase()}${str.slice(1)}`;
}
