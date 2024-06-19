chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fetchContent") {
    var content = document.body.innerText;
    chrome.runtime.sendMessage({ action: "displayContent", content: content });
  }
});
