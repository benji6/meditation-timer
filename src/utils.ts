const {documentElement} = document
const rootStyles = getComputedStyle(documentElement)

export const getCssVar = (key: string) => rootStyles.getPropertyValue(key).trim()
