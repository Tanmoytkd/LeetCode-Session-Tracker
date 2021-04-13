try {
  importScripts("src/js/leetCodeApi.js");
} catch (e) {
  console.error(e);
}

loadProgressData();
setInterval(loadProgressData, 60000);
