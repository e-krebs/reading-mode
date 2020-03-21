import { readingMode, cssId } from ".";
import { message } from "../typings";

let firstTime = true;
const timer = 10;

export const toggleReadingMode = () => {
  const cssElt: HTMLLinkElement | null = document.querySelector(`#${cssId}`);
  if (!cssElt) return;

  readingMode.toggle();

  cssElt.href = readingMode.isOn
    ? cssElt.getAttribute('_href') ?? ''
    : '';

  chrome.extension.sendRequest(readingMode.isOn
    ? message.showIconOn
    : message.showIconOff
  );

  if (firstTime) {
    setTimeout(shouldCenter, timer);
  }
}

const computeShouldCenter = (): boolean => {
  const article = document.querySelector('.reading-mode-article')! as HTMLElement;
  if (article.offsetLeft === 0 && (window.innerWidth - article.offsetWidth) >= 50) {
    return true;
  }
  return false;
}

const shouldCenter = () => {
  if (computeShouldCenter()) {
    document.body.classList.add('reading-mode-center');
    setTimeout(shouldCenterMore, timer);
  }
  firstTime = false;
}

const shouldCenterMore = () => {
  if (computeShouldCenter()) {
    document.body.classList.add('reading-mode-center-more');
  }
}
