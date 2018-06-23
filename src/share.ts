interface IShareOptions {
  onCopy: () => void
  title: string
  text?: string
  url: string
}

type NavigatorShare = (options: IShareOptions) => Promise<{}>

interface INavigator {
  share?: NavigatorShare
}

const nav = navigator as INavigator

export const shareAvailable = true

export default (options: IShareOptions) => {
  if (nav.share !== undefined) {
    nav.share(options)
    return
  }

  try {
    const copy = document.createElement('input')
    copy.value = options.url
    document.body.appendChild(copy)
    copy.select()
    document.execCommand('copy')
    document.body.removeChild(copy)
    options.onCopy()
  } catch (e) {
    prompt('Copy this link: ', options.url)
  }
}
