// Global Variables
const startBtn = document.getElementById("start");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const questions = [
  {
    title: "What is David Blaine's first name?",
    answers: ["David", "Chris", "Joe Exotic"],
    correct: "David",
  },
  {
    title: "What is God's last name?",
    answers: ["Smith", "Angel", "Blaine"],
    correct: "Smith",
  },
];

// Functions
function startGame() {
  // Show first question with answers
  questionDiv.innerHTML = questions[0].title;
  // Loop through answers
  questions[0].answers.forEach((answer) => {
      // Create element button, add attributes value and text, add click event, and append button to the answers div
      const answerBtn = document.createElement("button");
      answerBtn.textContent = answer;
      answerBtn.setAttributeNS("value", answer);
      answerBtn.onClick = answerClcik;
      answersDiv.appendChild(answerBtn);
  });
}

// Answer click function
function answerClick() {
    // Determine the answer the user chose
    let clickedAnswer = this.value;
    // Verify to see answer is correct
    if (clickedAnswer === questions[0].correct) {
        // Let user know they got the right answer
        // Move to next questyion or end game
        alert("You got the right answer!");
    } else {
        alert("You're wrong.");
    }
}

// End quiz

// Save high score
// Initialization- start
startBtn.addEventListener("click", startGame);