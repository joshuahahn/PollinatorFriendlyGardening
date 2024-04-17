$(function () {
  $("#learn").click(function () {
    window.location.href = `./learningmodules`;
  });

  $("#quiz").click(function () {
    window.location.href = `./quiz`;
  });

  if (data == true) {
    $("#learn").append(
      $(`<i class="glyphicon glyphicon-check justify-right"></i>`)
    );
  }
});
