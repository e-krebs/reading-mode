import { readingMode, cssId } from ".";
import { message } from "../typings";

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
}
