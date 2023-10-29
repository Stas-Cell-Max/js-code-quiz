// Define the questions and answers
var questions = [
    {
        question: "What is JavaScript?",
        choices: ["A programming language", "A type of coffee", "An operating system", "A pet"],
        answer: "A programming language"
    },
    {
        question: "What does 'DOM' stand for?",
        choices: ["Document Object Model", "Data Object Model", "Digital Object Model", "Database Object Model"],
        answer: "Document Object Model"
    },
    {
        question: "What is JavaScript?",
        choices: ["A programming language", "A type of coffee", "An operating system", "A pet"],
        answer: "A programming language"
    },
    {
        question: "What is JavaScript?",
        choices: ["A programming language", "A type of coffee", "An operating system", "A pet"],
        answer: "A programming language"
    },
    {
        question: "What is JavaScript?",
        choices: ["A programming language", "A type of coffee", "An operating system", "A pet"],
        answer: "A programming language"
    },
    // Add more questions here if needed
];

let currentQuestionIndex = 0;
let score = 0;
let timer = 45; // Set the initial time in seconds

var startButton = document.getElementById("start-button");
var quizContainer = document.getElementById("quiz-container");
var questionContainer = document.getElementById("question-container");
var answerContainer = document.getElementById("answer-container");
var scoreElement = document.getElementById("score");
var timerElement = document.getElementById("timer");
var gameOverContainer = document.getElementById("game-over-container");
var finalScoreElement = document.getElementById("final-score");
var initialsInput = document.getElementById("initials");
var saveScoreButton = document.getElementById("save-score");

// Function to start the quiz
function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    displayQuestion();
    startTimer();
}

// Function to display the current question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        var question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<h2>Question ${currentQuestionIndex + 1} of ${questions.length}</h2><p>${question.question}</p>`;
        answerContainer.innerHTML = question.choices.map(choice => `<button class="answer-choice">${choice}</button>`).join("");
    } else {
        endGame();
    }
}

// Function to check the user's answer
function checkAnswer(event) {
    if (event.target.classList.contains("answer-choice")) {
        var selectedChoice = event.target.textContent;
        var currentQuestion = questions[currentQuestionIndex];

        if (selectedChoice === currentQuestion.answer) {
            score += 10; // Adjust the score as needed
        } else {
            timer -= 10; // Deduct time for incorrect answers
        }

        currentQuestionIndex++;
        displayQuestion();
    }
}

// Function to start the timer
function startTimer() {
    var timerInterval = setInterval(function() {
        timer--;
        timerElement.textContent = timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Function to end the game and display the game over screen
function endGame() {
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
    finalScoreElement.textContent = score;
}

// Event listeners
startButton.addEventListener("click", startQuiz);
answerContainer.addEventListener("click", checkAnswer);
saveScoreButton.addEventListener("click", saveScore);

// Function to save the user's score
function saveScore() {
    var initials = initialsInput.value;
    // Implement code to save the score and initials (e.g., to a high scores list)
    // Redirect to a high scores page or display high scores here
}

// You can add more functions for handling high scores and other features as needed
// Select the question container and answer container elements
const questionContainer = document.getElementById("question-container");
const answerContainer = document.getElementById("answer-container");

// Example data for the question and answer choices
const question = "What is JavaScript?";
const answerChoices = ["A programming language", "A type of coffee", "An operating system", "A pet"];

// Update the question text
questionContainer.textContent = question;

// Create buttons for answer choices
answerContainer.innerHTML = ""; // Clear previous choices
answerChoices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("answer-choice"); // Add a class for styling
    answerContainer.appendChild(button);
});