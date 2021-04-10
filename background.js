try {
  importScripts("src/js/leetcodeApi.js");
} catch (e) {
  console.error(e);
}

let loadSessionData = async () => {
  let leetcodeProgress = await fetchLeetcodeProgress();
  chrome.storage.sync.set({ leetcodeProgress });
};

loadSessionData();
setInterval(loadSessionData, 60000);