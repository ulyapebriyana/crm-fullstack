export function toCamelCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function toCapitalized(input: string): string {
  return input
    .toLowerCase()
    .replace(/(^|\s|_)([a-z])/g, (_, prefix, letter) =>
      prefix + letter.toUpperCase()
    );
}