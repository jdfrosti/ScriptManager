chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    script: 'alert(\'testStart\');'
  }, function () {
    console.log('The current script is: ');
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