type ShareOptions = {
  title: string;
  text?: string;
  url: string;
}

type NavigatorShare = (options: ShareOptions) => Promise<{}>

interface Navigator {
  share?: NavigatorShare
}

const nav = navigator as Navigator

export const shareAvailable = Boolean(nav.share)

export default (options: ShareOptions) => nav.share && nav.share(options)
