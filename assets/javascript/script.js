// Define an array of quiz questions
var questions = [
    {
        prompt: "What is JavaScript?",
        options: [
            "A type of coffee",
            "A programming language",
            "An operating system",
            "A pet",
        ],
        answer: "A programming language",
    },
    {
        prompt: "What does 'DOM' stand for?",
        options: [
            "Data Object Model",
            "Document Object Model",
            "Digital Object Model",
            "Database Object Model",
        ],
        answer: "Document Object Model",
    },
    {
        prompt: "What is the purpose of the 'typeof' operator in JavaScript?",
        options: [
            "To concatenate strings",
            "To create a new variable",
            "To check the data type of a value",
            "To define a function",
        ],
        answer: "To check the data type of a value",
    },
    {
        prompt: "What is the 'this' keyword used for in JavaScript?",
        options: [
            "To display an alert",
            "To refer to the current object",
            "To declare a new variable",
            "To create a loop",
        ],
        answer: "To refer to the current object",
    },
    {
        prompt: "What does 'JS' stand for in JavaScript?",
        options: [
            "Just Saying",
            "Java Style",
            "JavaScript",
            "Jazz Symphony",
        ],
        answer: "JavaScript",
    },
];

// Get DOM elements
let questionsEl = document.querySelector("#questions");
let timerEl = document.querySelector("#timer");
let choicesEl = document.querySelector("#options");
let submitBtn = document.querySelector("#submit-score");
let startBtn = document.querySelector("#start");
let nameEl = document.querySelector("#name");
let feedbackEl = document.querySelector("#feedback");
let reStartBtn = document.querySelector("#restart");

// Initialize quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start the quiz while hiding the homepage
function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through the array of questions, create buttons for answer choices
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function (choice, i) {
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check answers, deduct time for incorrect answers, and move to the next question
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = "Wrong! The answer is " + questions[currentQuestionIndex].answer + ".";
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End the quiz by hiding questions, stopping the timer, and displaying the final score
function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End the quiz when the timer reaches 0
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save the score in local storage along with the user's name
function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        alert("Your Score has been Submitted");
    }
}

// Save the user's score after pressing enter
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert("Your Score has been Submitted");
    }
}
nameEl.onkeyup = checkForEnter;

// Save the user's score after clicking the submit button
submitBtn.onclick = saveHighscore;

// Start the quiz after clicking the start button
startBtn.onclick = quizStart;