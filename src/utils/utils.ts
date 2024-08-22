export function firstLetterToUp(str: string) {
    return str
        .trim()
        .toLowerCase()
        .replace(/^[^a-яa-z]*([a-zа-я])/, (first) => {
            return first.toUpperCase()
        })
}