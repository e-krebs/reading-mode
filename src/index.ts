import { message } from './typings';
import { prepareReadingMode, toggleReadingMode } from './utils';

let article = document.querySelector('article');
if (article && article.parentElement?.tagName === 'SECTION') {
  article = article.parentElement;
}

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
