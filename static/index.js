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

  const bee = document.querySelector(".bee");
  const garden = document.querySelector(".garden");

  // Set up initial position and angle
  let x = garden.clientWidth / 2;
  let y = garden.clientHeight / 2;
  let angle = Math.random() * Math.PI * 2; // Random initial angle in radians

  // Move the bee
  function moveBee() {
    // Calculate new position
    x += Math.cos(angle) * 10; // Move horizontally
    y += Math.sin(angle) * 10; // Move vertically

    // Check if bee hits garden boundaries
    if (
      x < 0 ||
      x > garden.clientWidth - bee.clientWidth ||
      y < 0 ||
      y > garden.clientHeight - bee.clientHeight
    ) {
      // Reverse angle to keep bee within garden
      angle += Math.PI;
      // Recalculate new position
      x += Math.cos(angle) * 10; // Move horizontally
      y += Math.sin(angle) * 10; // Move vertically
    }

    // Apply new position and rotation
    bee.style.left = x + "px";
    bee.style.top = y + "px";
    bee.style.transform = `rotate(${(angle * 180) / Math.PI}deg)`; // Convert angle to degrees for rotation

    // Randomly change direction
    angle += (Math.random() - 0.5) * Math.PI; // Random change in angle
  }

  // Move the bee every 50 milliseconds
  setInterval(moveBee, 50);
});
