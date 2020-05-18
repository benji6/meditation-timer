interface IShareOptions {
  onCopy: () => void;
  title: string;
  text?: string;
  url: string;
}

export default (options: IShareOptions) => {
  if (navigator.share) return navigator.share(options);

  try {
    const inputElement = document.createElement("input");
    inputElement.value = options.url;
    document.documentElement.appendChild(inputElement).select();
    document.execCommand("copy");
    document.documentElement.removeChild(inputElement);
    options.onCopy();
  } catch (e) {
    prompt("Copy this link: ", options.url);
  }
};
