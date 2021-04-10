// import from module still isn't supported in chrome extensions,
// so, we are importing the global fetchLeetCodeProgress from the html,
// once import from module is supported, use the following line:
// import { fetchLeetCodeProgress } from "./leetCodeApi";

let reloadSessionDataBtn = document.getElementById("reloadSessionData");
let sessionDataDiv = document.getElementById("sessionData");

function showSessionLoading() {
  sessionDataDiv.innerText = "Loading...";
}

function showSessionData() {
  chrome.storage.sync.get("leetCodeProgress", ({ leetCodeProgress }) => {
    let sessionData = undefined;

    if (leetCodeProgress.sessionName != undefined) {
      sessionData = leetCodeProgress.sessionName;
    } else {
      sessionData = "You are Logged out right now";
    }

    sessionDataDiv.innerText = sessionData;
  });
}

showSessionData();

reloadSessionDataBtn.addEventListener("click", async () => {
  showSessionLoading();

  let leetCodeProgress = await fetchLeetCodeProgress();
  if(leetCodeProgress.sessionName != undefined){
    leetCodeProgress.sessionName = "Anonymous Session";
  }
  chrome.storage.sync.set({ leetCodeProgress });

  showSessionData();

  console.log(`Session Reloaded: ${leetCodeProgress.sessionName}`);
});
