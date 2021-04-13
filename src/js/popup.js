// import from module still isn't supported in chrome extensions,
// so, we are importing the global fetchLeetCodeProgress from the html,
// once import from module is supported, use the following line:
// import { fetchLeetCodeProgress } from "./leetCodeApi";

let reloadSessionDataBtn = document.getElementById("reloadSessionData");
let sessionDataDiv = document.getElementById("sessionData");

function showSessionData() {
  chrome.storage.sync.get("leetCodeProgress", ({ leetCodeProgress }) => {
    let sessionData = undefined;

    if (leetCodeProgress.loading) {
      sessionData = "Loading...";
    } else {
      if (leetCodeProgress.sessionName == undefined) {
        sessionData = "You are Logged out right now";
      } else {
        sessionData = leetCodeProgress.sessionName;
      }
    }

    sessionDataDiv.innerText = sessionData;
  });
}

showSessionData();

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (key in changes) {
    if (key === "leetCodeProgress") {
      showSessionData();
    }
  }
});

reloadSessionDataBtn.addEventListener("click", async () => {
  loadProgressData();
  console.log(`Session Reloaded: ${leetCodeProgress.sessionName}`);
});
