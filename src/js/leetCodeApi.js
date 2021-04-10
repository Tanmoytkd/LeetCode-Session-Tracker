async function fetchLeetCodeProgress() {
  console.log("Fetch LeetCode Data");

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

  let leetCodeProgress = await response.json();

  console.log(leetCodeProgress);
  return leetCodeProgress;
}
