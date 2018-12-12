chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    scriptNames: ""
  }, function () {
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});