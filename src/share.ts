interface INavigator extends Navigator {
  share?: (
    options:
      | {
          text: string
        }
      | {
          title: string
        }
      | {
          url: string
        },
  ) => Promise<void>
}

const nav = navigator as INavigator

interface IShareOptions {
  onCopy: () => void
  title: string
  text?: string
  url: string
}

export default (options: IShareOptions) => {
  if (nav.share) return nav.share(options)

  try {
    const inputElement = document.createElement('input')
    inputElement.value = options.url
    document.documentElement.appendChild(inputElement).select()
    document.execCommand('copy')
    document.documentElement.removeChild(inputElement)
    options.onCopy()
  } catch (e) {
    prompt('Copy this link: ', options.url)
  }
}
