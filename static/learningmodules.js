$(function () {
  function categorizeCompletion(learningModuleData) {
    let locked = false;

    let completionArray = {};

    for (let i = 0; i < Object.keys(learningModuleData).length; i++) {
      let curId = i + 1;
      let cur = learningModuleData[curId];
      completionArray[curId] = {};

      if (cur["completed"] == "true") {
        completionArray[curId]["leftIcon"] = "";
        completionArray[curId]["rightIcon"] =
          '<i class="glyphicon glyphicon-check justify-right"></i>';
      } else if (cur["completed"] == "false" && locked == false) {
        locked = true;
        completionArray[curId]["leftIcon"] =
          '<i class="glyphicon glyphicon-arrow-left justify-right"></i>';
        completionArray[curId]["rightIcon"] = "";
      } else if (locked == true) {
        completionArray[curId]["leftIcon"] = "";
        completionArray[curId]["rightIcon"] =
          '<i class="glyphicon glyphicon-lock justify-right"></i>';
      }
    }

    return completionArray;
  }

  function createLearningModuleButtons(learningModuleData, completionArray) {
    let title = learningModuleData["title"];
    let completed = true ? learningModuleData["completed"] == "true" : false;
    let id = learningModuleData["id"];

    let icon = '<i class="glyphicon glyphicon-check justify-right"></i>';
    let newLearningModuleButton = $(
      `<div class=\"row learning-button-row\">
            <div class=\"col-md-2\">
            </div>
            
            <div class=\"col-md-8 learning-module-button center-text\">
                <span class=\"module-title\">${title}</span>${completionArray[id]["leftIcon"]}
                ${completionArray[id]["rightIcon"]}
            </div>
        </div>`
    );

    $("#main-container").append(newLearningModuleButton);
    newLearningModuleButton.click(function () {
      window.location.href = `../learn/${id}`;
    });
  }

  let completions = categorizeCompletion(data);
  console.log(completions);

  for (let i = 0; i < Object.keys(data).length; i++) {
    createLearningModuleButtons(data[i + 1], completions);
  }
});
