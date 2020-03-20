import { cssId } from ".";

export const prepareReadingMode = (article: HTMLElement) => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.id = cssId;
  css.setAttribute('_href', chrome.extension.getURL('index.css'));
  document.body.appendChild(css);

  // @ts-ignore
  let width: boolean = article.computedStyleMap()?.get('width')?.value === 'auto';
  // @ts-ignore
  if (width && article.parentElement?.computedStyleMap()?.get('width')?.value !== 'auto') {
    width = false;
  }
  article.classList.add(width
    ? 'reading-mode-article-width'
    : 'reading-mode-article');

  const nodes = Array.from(document.querySelectorAll('*'));
  for (var node of nodes) {
    if (node.contains(article)) {
      node.classList.add('reading-mode-displayed', 'reading-mode-parent');
    }
    if (article.contains(node)) {
      node.classList.add('reading-mode-displayed');
      if ((node as HTMLElement).style?.backgroundImage) {
        node.classList.add('reading-mode-bg-image');
      }
    }
  }
}