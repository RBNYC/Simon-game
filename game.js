var buttonColours = ["red", "blue", "green", "yellow"]; // Array with the different colours
var gamePattern = []; // Array which will contain the random colour
var userClickedPattern = [];
var started = 0;
var level = 0;

$(document).keypress(function() {
  started = started + 1;
  if (started === 1) {
    $('#level-title').text("Level 0")
    nextSequence();
  }
})

function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3); // Random number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //console.log(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



$(".btn").click(function() { //Detects when any of the button is clicked
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  started = 0;
  level = 0;
  gamePattern = [];
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100);
}
