import { message } from './typings';
import { prepareReadingMode, toggleReadingMode, getArticle } from './utils';

const main = (article: HTMLElement | null) => {
  chrome.extension.sendRequest(article === null
    ? message.hideIcon
    : message.showIconOff
  );

  if (article !== null) {
    prepareReadingMode(article);

    chrome.runtime.onMessage.addListener(msg => {
      if (msg === message.readingMode) {
        toggleReadingMode();
      }
    });
  }
}

let nb = 0;

const doJob = () => {
  const article = getArticle();
  if (article) {
    main(article);
  } else {
    nb++;
    setTimeout(doJob, 1000 * nb);
  }
}

doJob();
