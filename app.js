
var questions = [];
var SQUARE_SIZE = 50;

var questionCounter = 0;

function init() {

  let version = new URL(window.location.href).searchParams.get("version");

  if (version !== null) {
    $.getJSON("versions/" + version + ".json", function(json) {
      questions = json.questions;

      loadQuestion();
    });
  } else {
    alert("No version set!");
  }

  $('#answer').on("input", function() {
    console.log('here');
    $(this).removeClass('incorrect correct');
    $('.feedback').removeClass('incorrect correct');
    $('.feedback').html("");
  });
}

function loadQuestion() {
  question = questions[questionCounter];

  // Update question counter graphic.
  $('.questionCounter').html(`${questionCounter+1}/${questions.length}`);

  // Empty the grid.
  $('.grid').empty();

  // Load equation.
  $('.numerator').html(question.numerator);
  $('.denominator').html(question.denominator);
  $('.wholeNumber').html(question.wholeNumber);

  // Build grid HTML.
  $('.grid').append(`<div class="line-top"><div class="number">${question.denominator}</div></div>`);
  for (var i = 1; i <= question.denominator; i++) {
    if (i <= question.numerator) {
      $('.grid').append(`<div class="square colored"><div class="number">${question.wholeNumber / question.denominator}</div></div>`);
    } else {
      $('.grid').append(`<div class="square"><div class="number">${question.wholeNumber / question.denominator}</div></div>`);
    }
  }
  $('.grid').append('<div class="line-bottom"><div class="number">?</div></div>');

  // Update grid CSS.
  $('.grid').css("width", SQUARE_SIZE * question.denominator + (2 * question.denominator));
  $('.grid .square').css({"width": SQUARE_SIZE, "height": SQUARE_SIZE});
  $('.grid .line-top').css("width", SQUARE_SIZE * question.denominator + 8);
  $('.grid .line-bottom').css("width", SQUARE_SIZE * question.numerator + 8);

}

function check() {


  question = questions[questionCounter];

  if (parseInt($("#answer").val()) === ((question.numerator * question.wholeNumber) / question.denominator)) {
    $(".feedback, #answer").addClass("correct");
    $(".feedback").html("Correct!");
    $('#check').attr("disabled", true);

    setTimeout(function() {
      if (questionCounter == questions.length - 1) {
        end();
      } else {

        $(".feedback, #answer").removeClass("correct");
        $(".feedback").html("");

        $("#answer").val("");
        questionCounter++;
        loadQuestion();

        $('#check').attr("disabled", false);
      }
    }, 1000);

  } else {
    $(".feedback, #answer").addClass("incorrect");
    $(".feedback").html("Incorrect! Try again...");
  }
}

function end() {
  alert("Game over!");
}
