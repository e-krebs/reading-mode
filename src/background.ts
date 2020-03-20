import icon_off from './icons/icon_off.png';
import icon_on from './icons/icon_on.png';
import { message } from './typings';

chrome.extension.onRequest.addListener(
  (request: message, sender, sendResponse) => {
    if (sender.tab?.id) {
      const tabId: number = sender.tab.id;
      switch (request) {
        case message.showIconOff:
          chrome.pageAction.setIcon({
            tabId: tabId,
            path: icon_off
          });
          chrome.pageAction.show(tabId);
          break;
        case message.showIconOn:
          chrome.pageAction.setIcon({
            tabId: tabId,
            path: icon_on
          });
          chrome.pageAction.show(tabId);
          break;
        case message.hideIcon:
          chrome.pageAction.setIcon({
            tabId: tabId,
            path: '/icons/icon_48.png'
          });
          chrome.pageAction.hide(tabId);
          break;
      }
    }
    sendResponse({});
  }
);

chrome.pageAction.onClicked.addListener(
  tab => tab?.id && chrome.tabs.sendMessage(tab.id, message.readingMode)
);
