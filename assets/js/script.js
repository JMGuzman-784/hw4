// Global Variables
let timeAmount = 75;
let timerId;
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const startContainerElement = document.getElementById("start-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const checkAnswerElement = document.getElementById("check-answer")
const isWin = false;
const scores = JSON.parse(localStorage.getItem("scores")) || [];
const viewLeaderboard = document.getElementById("highscores-link");
const submitButton = document.getElementById("submit-btn");
const clearScoreButton = document.getElementById("clear-btn");
const initialsField = document.getElementById("player-name");
const restartButton = document.getElementById("restart-btn");
const scoreField = document.getElementById("player-score");


let shuffledQuestions, currentQuestionIndex;

// Allows to start and go to next question
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Time countdown
function timeTick() {
  timeAmount--;
  timerElement.textContent = "Time: " + timeAmount;
  if (timeAmount <= 0) {
    saveScore();
  }
}

// Start game
function startGame() {
  // Time countdown setting
  timerId = setInterval(timeTick, 1000);
  startContainerElement.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0
  questionContainerElement.classList.remove("hide");
  
  // Timer begins once "start" is clicked
  timeTick();
  setNextQuestion();
}

// Go to next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Show question
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  })
}

// Hides previous question and answers
function resetState() {
  //clearStatusClass(document.body)
  nextButton.classList.add("hide");
  checkAnswerElement.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
      (answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct;
  checkAnswerElement.classList.remove("hide")
  // Check if the answer correct or wrong then show text
  if (correct) {
      checkAnswerElement.innerText = "You got it right!";
  } else {
      checkAnswerElement.innerText = "Sorry that was not the correct answer.";
      if (timeAmount <= 10) {
          timeAmount = 0;
      } else {
          // If the aswer is wrong, deduct time by 10
          timeAmount -= 10;
      }
  }
  //setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
    checkAnswerElement.classList.remove("hide");
  } else {
    
    startButton.classList.remove("hide");
    saveScore();
  }
};

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
};

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
};

// Leaderboard
function saveScore() {
  clearInterval(timerId);
  timerElement.textContent = "Time: " + timeAmount;
  setTimeout(function () {
    localStorage.setItem("scores", JSON.stringify(scores));
    questionContainerElement.classList.add("hide");
    document.getElementById("score-container").classList.remove("hide");
    document.getElementById("your-score").textContent = "Your final score is... " + timeAmount;

  }, 2000)
};

let loadScores = function () {

  // Get score from local storage
  if (!saveScore) {
      return false;
  }

  // Convert scores from stringfield format into array
  saveScore = JSON.parse(saveScore);
  let initials = document.querySelector("#initials-field").value;
  let newScore = {
      score: timeAmount,
      initials: initials
  }
  saveScore.push(newScore);
  console.log(saveScore)

  saveScore.forEach(score => {
      initialsField.innerText = score.initials
      scoreField.innerText = score.score
  })
};

// Show leaderboard after 
function showHighScores(initials) {
  document.getElementById("highscores").classList.remove("hide")
  document.getElementById("score-container").classList.add("hide");
  startContainerElement.classList.add("hide");
  questionContainerElement.classList.add("hide");
  if (typeof initials == "string") {
      let score = {
          initials, timeAmount
      }
      scores.push(score)
  }
  // How the score is shown in the HTML after submitting
  let highscoreElement = document.getElementById("highscore");
  highscoreElement.innerHTML = "";
  //console.log(scores)
  for (i = 0; i < scores.length; i++) {
      // Create div with player name 
      let div1 = document.createElement("div");
      div1.setAttribute("class", "name-div");
      div1.innerText = scores[i].initials;
      // Create div with player score
      let div2 = document.createElement("div");
      div2.setAttribute("class", "score-div");
      div2.innerText = scores[i].timeAmount;

      highscoreElement.appendChild(div1);
      highscoreElement.appendChild(div2);
  }
  localStorage.setItem("scores", JSON.stringify(scores));
};

// Action to display leaderboard
viewLeaderboard.addEventListener("click", showHighScores);

// Inititals from player
submitButton.addEventListener("click", function (event) {
  event.preventDefault()
  let initials = document.querySelector("#initials-field").value;
  showHighScores(initials);
});

// Restart or reload the page
restartButton.addEventListener("click", function () {
  window.location.reload();
});

// Clear localStorage items 
clearScoreButton.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("highscore").innerHTML = "";
});