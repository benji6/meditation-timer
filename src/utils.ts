const {documentElement} = document
const rootStyles = getComputedStyle(documentElement)

export const getCssVar = (key: string) => rootStyles.getPropertyValue(key).trim()
export const setCssVar = (key: string, val: string) => documentElement.style.setProperty(key, val)
