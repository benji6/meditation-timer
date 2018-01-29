type ShareOptions = {
  onCopy: () => void;
  title: string;
  text?: string;
  url: string;
}

type NavigatorShare = (options: ShareOptions) => Promise<{}>

interface Navigator {
  share?: NavigatorShare
}

const nav = navigator as Navigator

export const shareAvailable = true

export default (options: ShareOptions) => {
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
