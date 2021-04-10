try {
  importScripts("src/js/leetCodeApi.js");
} catch (e) {
  console.error(e);
}

let loadSessionData = async () => {
  let leetCodeProgress = await fetchLeetCodeProgress();
  chrome.storage.sync.set({ leetCodeProgress });
};

loadSessionData();
setInterval(loadSessionData, 60000);