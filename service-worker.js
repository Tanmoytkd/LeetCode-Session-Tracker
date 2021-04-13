try {
  importScripts("src/js/leetCodeApi.js");
} catch (e) {
  console.error(e);
}

loadProgressData();

chrome.alarms.onAlarm.addListener(async function (alarm) {
  if (alarm.name == "reload-leetcode-progress") {
    loadProgressData();
  }
});

chrome.alarms.create("reload-leetcode-progress", {
  periodInMinutes: 1,
});
