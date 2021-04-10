// import from module still isn't supported in chrome extensions,
// so, we are importing the global fetchLeetcodeProgress from the html,
// once import from module is supported, use the following line:
// import { fetchLeetcodeProgress } from "./leetcodeApi";

let reloadSessionDataBtn = document.getElementById("reloadSessionData");
let sessionDataDiv = document.getElementById("sessionData");

function showSessionLoading() {
  sessionDataDiv.innerText = "Loading...";
}

function showSessionData() {
  chrome.storage.sync.get("leetcodeProgress", ({ leetcodeProgress }) => {
    let sessionData = undefined;

    if (leetcodeProgress.sessionName != undefined) {
      sessionData = leetcodeProgress.sessionName;
    } else {
      sessionData = "You are Logged out right now";
    }

    sessionDataDiv.innerText = sessionData;
  });
}

showSessionData();

reloadSessionDataBtn.addEventListener("click", async () => {
  showSessionLoading();

  let leetcodeProgress = await fetchLeetcodeProgress();
  chrome.storage.sync.set({ leetcodeProgress });

  showSessionData();

  console.log(`Session Reloaded: ${leetcodeProgress.sessionName}`);
});
