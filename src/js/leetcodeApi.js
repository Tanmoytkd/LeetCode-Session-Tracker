async function fetchLeetcodeProgress() {
  console.log("Fetch Leetcode Data");

  let response = await fetch("https://leetcode.com/api/progress/all/", {
    headers: {
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://leetcode.com/problemset/all/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  let leetcodeProgress = await response.json();

  console.log(leetcodeProgress);
  return leetcodeProgress;
}
