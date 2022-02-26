export const isEmptyObject = (object: unknown): boolean => {
    return !Object.keys(object).length
}
