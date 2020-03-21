import { cssId } from ".";

const toHideList: string[] = [
  '_ad',
  '-week',
  'articles',
  'category',
  'commentaires',
  'comment',
  'last',
  'links',
  'newsletter',
  'preview',
  'pub_',
  'related',
  'service',
  'share',
  'social',
  'tags',
];

const toHideTags: string[] = [
  'CONTENT-SIDE-MENU',
  'FORM',
  'NAV',
];

const shouldBeHidden = (node: Element): boolean => {
  if (toHideTags.includes(node.tagName)) return true;

  const classList = Array.from(node.classList);
  const id = node.id;

  for (const toHide of toHideList) {
    if (classList.find(c => c.indexOf(toHide) >= 0)) {
      return true;
    }
    if (id.indexOf(toHide) >= 0) return true;
  }

  return false;
}

const getComputedStyleFor = (elt: Element | null, property: string): any => {
  if (elt === null) return null;
  // @ts-ignore
  return elt.computedStyleMap()?.get(property);
}

export const prepareReadingMode = (article: HTMLElement) => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.id = cssId;
  css.setAttribute('_href', chrome.extension.getURL('index.css'));
  document.body.appendChild(css);

  let width: boolean = getComputedStyleFor(article, 'width')?.value === 'auto';
  if (width && getComputedStyleFor(article.parentElement, 'width')?.value !== 'auto') {
    width = false;
  }
  article.classList.add('reading-mode-article');
  if (width) article.classList.add('reading-mode-article-width');

  const nodes = Array.from(document.querySelectorAll('*'));
  for (var node of nodes) {
    let displayed = false;
    if (node.contains(article)) {
      displayed = true;
      node.classList.add('reading-mode-parent');
    }

    if (article.contains(node)) {
      displayed = true;

      if (node.tagName === 'ARTICLE') {
        const width = getComputedStyleFor(node, 'width');
        if (width.unit && width.value) {
          node.classList.add('reading-mode-width-unset');
        }
      }

      if ((node as HTMLElement).style?.backgroundImage) {
        node.classList.add('reading-mode-bg-image');
      }

      if (shouldBeHidden(node)) {
        node.classList.add('reading-mode-hidden');
        let currentNode = node.parentElement;
        while (
          currentNode &&
          currentNode.childElementCount === 1 &&
          !currentNode.classList.contains('no-margin-padding')
        ) {
          currentNode.classList.add('no-margin-padding');
          currentNode = currentNode.parentElement;
        }
      }

    }

    if (!displayed) {
      node.classList.add('reading-mode-hidden');
    }
  }
}