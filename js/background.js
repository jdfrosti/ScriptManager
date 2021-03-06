chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({scriptNames: "Alert;Confirm"}, function () {});
  chrome.storage.sync.set({Alert: "alert('Alert Test');"}, function () {});
  chrome.storage.sync.set({Confirm: "alert(confirm('Confirm Test'));"}, function () {});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});