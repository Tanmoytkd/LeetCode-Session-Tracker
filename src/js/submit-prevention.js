function replaceSubmitBtnWithDummy() {
  let submitBtn = $(".submit__2ISl");
  if (submitBtn == undefined) {
    return;
  }

  submitBtn.hide();
  $(".dummy-submit-btn").remove();

  let dummyButton = $(
    '<button type="primary" class="dummy-submit-btn css-ieo3pr"><span class="css-1km43m6-BtnContent e5i1odf0">Submit</span></button>'
  );
  dummyButton.insertAfter(submitBtn);

  dummyButton.click(() => {
    chrome.storage.sync.get("leetCodeProgress", ({ leetCodeProgress }) => {
      if (leetCodeProgress.loading) {
        alert(
          "You cannot submit when the session is loading. Please wait a moment and try again."
        );
      } else if (leetCodeProgress.sessionName == undefined) {
        alert("You are Logged out right now. Please Login to submit solutions");
      } else {
        let sessionName = leetCodeProgress.sessionName;
        let submitConfirmed = confirm(
          `Do you want to submit your code with session "${sessionName}"?`
        );

        if (submitConfirmed) {
          submitBtn.trigger("click");
        } else {
          alert("Submission Cancelled");
        }
      }

      showSessionList(leetCodeProgress);
    });
  });
}

setInterval(replaceSubmitBtnWithDummy, 2000);
