const excludedTagNames: string[] = ['BODY'];

export const getArticle = (): HTMLElement | null => {
  let article = document.querySelector('article');
  if (article === null) return null;

  // if parent is a section => it is the article
  if (article && article.parentElement?.tagName === 'SECTION') {
    article = article.parentElement;
  }

  // more than one title ? 🤷‍♂️
  const titles = Array.from(document.querySelectorAll('h1'));
  if (titles.length > 1) return article;

  // article contains title => bingo!
  const title = titles[0];
  if (article?.contains(title)) return article;

  // find parent who contains article & title
  let articleWithTitle = article;
  while (articleWithTitle.parentElement !== null) {
    articleWithTitle = articleWithTitle.parentElement;
    if (articleWithTitle.contains(title)) {
      return articleWithTitle;
    }
    if (excludedTagNames.includes(articleWithTitle.tagName)) {
      break;
    }
  }

  return article;
}
