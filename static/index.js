$(function () {
  $("#learn").click(function () {
    window.location.href = `./learningmodules`;
  });

  $("#quiz").click(function () {
    window.location.href = `./quiz/0`;
  });

  if (data == true) {
    $("#learn").append(
      $(`<i class="glyphicon glyphicon-check justify-right"></i>`)
    );
  }
});
