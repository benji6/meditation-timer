const documentElement = document.documentElement as HTMLElement
const rootStyles = getComputedStyle(documentElement)

export const getCssVar = (key: string) =>
  rootStyles.getPropertyValue(key).trim()
