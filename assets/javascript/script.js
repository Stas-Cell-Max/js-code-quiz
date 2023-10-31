var questions = [

{ 
    prompt: `What is JavaScript?`, 
    options: [ 
        "A type of coffee",
        "A programming language", 
        "An operating system", 
        "A pet", 
    ], 
    answer: "A programming language", 
}, 

{ 
    prompt: `What does 'DOM' stand for?`, 
    options: [ 
       
        "Data Object Model", 
         "Document Object Model", 
        "Digital Object Model", 
        "Database Object Model", 
    ], 
    answer: "Document Object Model", 
}, 

{ 
    prompt: `What is the purpose of the 'typeof' operator in JavaScript?`, 
    options: [
    
    "To concatenate strings", 
    "To create a new variable", 
    "To check the data type of a value", 
    "To define a function"
], 
    answer: "To check the data type of a value", 
}, 

{ 
    prompt: `What is the 'this' keyword used for in JavaScript?`, 
    options: [
    "To display an alert" ,
     "To refer to the current object",
     "To declare a new variable",
      "To create a loop",  
    ],
    answer: "To refer to the current object",
}, 
{ 
    prompt: `What does 'JS' stand for in JavaScript?`, 
    options: [
        
        "Just Saying", 
        "Java Style", 
        "JavaScript", 
        "Jazz Symphony"
    ],
    answer: "JavaScript",
}, 

]; 

// Get DOM Elements 

let questionsEl = 
document.querySelector( 
    "#questions"
); 
let timerEl = 
document.querySelector("#timer"); 
let choicesEl = 
document.querySelector("#options"); 
let submitBtn = document.querySelector( 
"#submit-score"
); 
let startBtn = 
document.querySelector("#start"); 
let nameEl = 
document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
"#feedback"
); 
let reStartBtn = 
document.querySelector("#restart"); 

// Quiz's initial state 
let currentQuestionIndex = 0; 
let time = questions.length * 15; 
let timerId; 

// Start quiz while hide the homepage 

function quizStart() { 
timerId = setInterval( 
    clockTick, 
    1000 
); 
timerEl.textContent = time; 
let landingScreenEl = 
    document.getElementById( 
        "start-screen"
    ); 
landingScreenEl.setAttribute( 
    "class", 
    "hide"
); 
questionsEl.removeAttribute( 
    "class"
); 
getQuestion(); 
} 

// Loop through the array of questions and 
// Answers and create buttons list  
function getQuestion() { 
let currentQuestion = 
    questions[currentQuestionIndex]; 
let promptEl = 
    document.getElementById( 
        "question-words"
    ); 
promptEl.textContent = 
    currentQuestion.prompt; 
choicesEl.innerHTML = ""; 
currentQuestion.options.forEach( 
    function (choice, i) { 
        let choiceBtn = 
            document.createElement( 
                "button"
            ); 
        choiceBtn.setAttribute( 
            "value", 
            choice 
        ); 
        choiceBtn.textContent = 
            i + 1 + ". " + choice; 
        choiceBtn.onclick = 
            questionClick; 
        choicesEl.appendChild( 
            choiceBtn 
        ); 
    } 
); 
} 

// Check for right answers and deduct the time for wrong answer, then go to next question 


function questionClick() { 
if ( 
    this.value !== 
    questions[currentQuestionIndex] 
        .answer 
) { 
    time -= 10; 
    if (time < 0) { 
        time = 0; 
    } 
    timerEl.textContent = time; 
    feedbackEl.textContent = `Wrong! The answer is  
    ${questions[currentQuestionIndex].answer}.`; 
    feedbackEl.style.color = "red"; 
} else { 
    feedbackEl.textContent = 
        "Correct!"; 
    feedbackEl.style.color = 
        "green"; 
} 
feedbackEl.setAttribute( 
    "class", 
    "feedback"
); 
setTimeout(function () { 
    feedbackEl.setAttribute( 
        "class", 
        "feedback hide"
    ); 
}, 2000); 
currentQuestionIndex++; 
if ( 
    currentQuestionIndex === 
    questions.length 
) { 
    quizEnd(); 
} else { 
    getQuestion(); 
} 
} 

// End quiz by hiding questions, then stop the timer and show the  final score 


function quizEnd() { 
clearInterval(timerId); 
let endScreenEl = 
    document.getElementById( 
        "quiz-end"
    ); 
endScreenEl.removeAttribute( 
    "class"
); 
let finalScoreEl = 
    document.getElementById( 
        "score-final"
    ); 
finalScoreEl.textContent = time; 
questionsEl.setAttribute( 
    "class", 
    "hide"
); 
} 

// End quiz when timer reaches 0 

function clockTick() { 
time--; 
timerEl.textContent = time; 
if (time <= 0) { 
    quizEnd(); 
} 
} 

// Save score in the local storage along with users' name


function saveHighscore() { 
let name = nameEl.value.trim(); 
if (name !== "") { 
    let highscores = 
        JSON.parse( 
            window.localStorage.getItem( 
                "highscores"
            ) 
        ) || []; 
    let newScore = { 
        score: time, 
        name: name, 
    }; 
    highscores.push(newScore); 
    window.localStorage.setItem( 
        "highscores", 
        JSON.stringify(highscores) 
    ); 
    alert( 
        "Your Score has been Submitted"
    ); 
} 
} 

// Save users' score after pressing enter 

function checkForEnter(event) { 
if (event.key === "Enter") { 
    saveHighscore(); 
    alert( 
        "Your Score has been Submitted"
    ); 
} 
} 
nameEl.onkeyup = checkForEnter; 

// Save users' score after clicking submit 

submitBtn.onclick = saveHighscore; 

// Start quiz after clicking start quiz 

startBtn.onclick = quizStart;








