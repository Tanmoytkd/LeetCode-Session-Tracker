// import from module still isn't supported in chrome extensions,
// so, we are importing the global fetchLeetCodeProgress from the html,
// once import from module is supported, use the following line:
// import { fetchLeetCodeProgress } from "./leetCodeApi";

let reloadSessionDataBtn = document.getElementById("reloadSessionData");
let sessionDataDiv = document.getElementById("sessionData");

function showSessionList(leetCodeProgress) {
  let sessionList = leetCodeProgress.sessionList;
  if (sessionList == undefined || sessionList.length === 0) {
    $("#sessionChangeForm").hide();
  } else {
    $("#newSession").html("");

    $("<option>")
      .val("")
      .text(leetCodeProgress.sessionName)
      .appendTo($("#newSession"));

    for (const session of sessionList) {
      $("<option>")
        .val(session.id)
        .text(session.name)
        .appendTo($("#newSession"));
    }

    $("#sessionChangeForm").show();
  }
}

function showSessionData() {
  chrome.storage.sync.get("leetCodeProgress", ({ leetCodeProgress }) => {
    if (leetCodeProgress.loading) {
      sessionDataDiv.innerText = "Loading...";
      showSessionList(leetCodeProgress);
    } else if (leetCodeProgress.sessionName == undefined) {
      sessionDataDiv.innerText = "You are Logged out right now";
      showSessionList(leetCodeProgress);
    } else {
      sessionData = leetCodeProgress.sessionName;
      sessionDataDiv.innerText = sessionData;

      showSessionList(leetCodeProgress);
    }
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

$("#newSession").change(async () => {
  $("#newSession option:selected").each(async function () {
    if ($(this).val() != undefined && $(this).val() != "") {
      let sessionId = parseInt($(this).val());
      console.log(sessionId);

      try {
        let response = await fetch("https://leetcode.com/session/", {
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,bn;q=0.8",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua":
              '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
          },
          referrer: "https://leetcode.com/problemset/all/",
          referrerPolicy: "strict-origin-when-cross-origin",
          body: `{"func":"activate","target":${sessionId}}`,
          method: "PUT",
          mode: "cors",
          credentials: "include",
        });

        let data = await response.json();
        loadProgressData();

        console.log("Change Session:");
        console.log(data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    }
  });
});
