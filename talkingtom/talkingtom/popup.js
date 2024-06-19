// popup.js

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("fetchButton")
    .addEventListener("click", fetchContent);
});

function fetchContent() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "fetchContent" });
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "displayContent") {
    document.getElementById("contentContainer").textContent = request.content;
    // Speak after a delay to ensure user interaction
    setTimeout(function () {
      speak(request.content);
    }, 100);
  }
});

function speak(textToSpeak) {
  if ("speechSynthesis" in window) {
    var synthesis = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Optionally, you can set additional parameters for the voice, rate, pitch, etc.
    // utterance.voice = ...;
    // utterance.rate = ...;
    // utterance.pitch = ...;

    synthesis.speak(utterance);
  } else {
    alert(
      "Speech synthesis is not supported in your browser. Please use a modern browser."
    );
  }
}
