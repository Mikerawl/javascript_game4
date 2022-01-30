var timerEl = document.getElementById("countdown");
var startQuiz = document.getElementById("start-quiz");
var questionBank = document.getElementById("question-bank");
var questionItem = document.getElementById("question-item");
var answerTrue = document.getElementById("answer-true");
var answerFalse = document.getElementById("answer-false");
var welcome = document.getElementById("welcome");
var questionNumber = 0;
var message = "Game Over";
var answerButton = document.querySelectorAll(".answer-button");
var checkedAnswer = document.getElementById("checked-answer");
var endGame = document.getElementById("end-game");
var gameScore = document.getElementById("game-score");
var timeInterval;
var score = 0;
var timeLeft = 45;

var questions = [
  {
    question: "the main programing language of the internet is Java.",
    show: ["True", "False"],
    answer: "0",
  },
  {
    question: "The currently preferred variables are 'let' and 'var'.",
    show: ["True", "False"],
    answer: "1",
  },
  {
    question:
      "Responsive design allows web pages to be displayed on computer, phones, and tablets correctly.",
    show: ["True", "False"],
    answer: "1",
  },
  {
    question: "It is possible to add content o HTML from the Javascript page.",
    show: ["True", "False"],
    answer: "0",
  },
];

var score = 0;

// beginQuiz starts the quiz
function beginQuiz() {
  welcome.style.display = "none";
  questionBank.style.display = "block";
  countdown();
  replaceQuestion(questionNumber);
}

function replaceQuestion() {
  if (questionNumber == questions.length) {
    endQuiz();
  } else {
    questionItem.textContent = questions[questionNumber].question;
    answerTrue.textContent = questions[questionNumber].show[1];
    answerFalse.textContent = questions[questionNumber].show[0];
    questionNumber++;
  }
}

function checkAnswer(event) {
  event.preventDefault();

  if (questions[questionNumber - 1].answer === event.target.value) {
    console.log("score");
    checkedAnswer.textContent = "correct";
  } else {
    checkedAnswer.textContent = "incorrect";
    timeLeft -= 10;
  }
  checkedAnswer.setAttribute("style", "display:block");
  setTimeout(function () {}, 2000);

  replaceQuestion();
}

// Timer that counts down from 45
function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = "";
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
    }
  }, 1000);
}

function endQuiz() {
  score = timeLeft;
  welcome.setAttribute("style", "display:none");
  questionBank.setAttribute("style", "display:none");
  endGame.setAttribute("style", "display:block");

  gameScore.textContent = score;
  clearInterval(timeInterval);
}

function savingScore() {
  var scoreSubmit = document.getElementById("score-submit");

  scoreSubmit.addEventListener("click", (event) => {
    var initials = document.getElementById("initials").value.trim();

    var addEntry = {
      "initials": initials,
      "score": score,
    };

    var SaveScore = JSON.parse(localStorage.getItem("player-scores"))|| [];
    localStorage.setItem("addEntry", JSON.stringify(addEntry));
    SaveScore.push(addEntry);
    localStorage.setItem("player-scores", JSON.stringify(SaveScore));
    
  });
}

savingScore();

startQuiz.addEventListener("click", beginQuiz);

answerButton.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});
