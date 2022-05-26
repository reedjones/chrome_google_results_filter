// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

chrome.storage.local.set({SearchResultsBlockedUrls: ["justanexamplewebsite.fake"]});


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "resultFilterContextMenu",
    "title": "Result Filter",
    "contexts": ["selection"]
  });
});

const mainUrlFilter = {
  url: [
    {
      urlMatches: 'https://www.google.com/*',
    },
  ],
};

chrome.webNavigation.onCompleted.addListener(() => {
  console.info("You loaded google");
}, mainUrlFilter);



chrome.runtime.onMessage.addListener((message, callback) => {
  const tabId = getForegroundTabId();
  if (message.data === "setAlarm") {
    chrome.alarms.create({delayInMinutes: 5})
  } else if (message.data === "runLogic") {
    chrome.scripting.executeScript({file: 'logic.js', tabId});
  } else if (message.data === "changeColor") {
    chrome.scripting.executeScript(
        {func: () => document.body.style.backgroundColor="orange", tabId});
  };
});



chrome.runtime.onSuspend.addListener(() => {
  console.log("Unloading.");
  chrome.browserAction.setBadgeText({text: ""});
});
