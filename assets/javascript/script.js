var questions = [
    {
        question: "What is JavaScript?",
        optionA: "A type of cofee",
        optionB: "A programming language",
        optionC: "An operating system",
        optionD: "A framework",
        correctOption: "optionB"
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        optionA: "<script>",
        optionB: "<js>",
        optionC: "<Java Script>",
        optionD: "scripting",
        correctOption: "optionA"
    },

    {
        question: "Where is the correct place to insert a JavaScript?",
        optionA: "Within a comment <!-- ... --> in the HTML content",
        optionB: "In the <head> section",
        optionC: "In the <body> section",
        optionD: "Both the <hed> section and the <body> section are correct",
        correctOption: "optionD"
    },

    {
        question: "What is JavaScript primarily used for?",
        optionA: "Styling web pages",
        optionB: "Structuring web content",
        optionC: "Adding interactivity to web pages",
        optionD: "Managing databases",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is a correct way to declare a variable in JavaScript?",
        optionA: " variable x",
        optionB: "var x",
        optionC: "v x",
        optionD: "let x",
        correctOption: "optionB"
    },

    {
        question: "What is the purpose of the if statement in JavaScript?",
        optionA: "Loop through an array",
        optionB: "Define a function",
        optionC: "Control the flow of code based on a condition",
        optionD: "Print text to the console",
        correctOption: "optionC"
    },

    {
        question: "What is the correct syntax to create a function in JavaScript?",
        optionA: "create myFunction()",
        optionB: "function = myFunction()",
        optionC: "function myFunction()",
        optionD: "def myFunction():",
        correctOption: "optionC"
    },

    {
        question: "Which operator is used for strict equality in JavaScript?",
        optionA: "=",
        optionB: "==",
        optionC: "!==",
        optionD: "===",
        correctOption: "optionD"
    },

    {
        question: "What does the typeof operator do in JavaScript?",
        optionA: "Returns the data type of a value",
        optionB: "Compares two values",
        optionC: "Checks if a variable is defined",
        optionD: "Converts a string to a number",
        correctOption: "optionA"
    },

    {
        question: "How do you comment a single line in JavaScript?",
        optionA: "/* This is a comment */",
        optionB: "// This is a comment",
        optionC: "-- This is a comment",
        optionD: "' This is a comment",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is not a data type in JavaScript?",
        optionA: "String",
        optionB: "Boolean",
        optionC: "Number",
        optionD: "Character",
        correctOption: "optionD"
    },

    {
        question: "What is an array in JavaScript?",
        optionA: "A single value",
        optionB: "A data structure to store multiple values",
        optionC: "A function",
        optionD: "A loop",
        correctOption: "optionB"
    } 
]


var numQuestions = 12; // Number of questions to select
var maxScore = 10; // Maximum score for the game
var timePerQuestion = 30; // Time in seconds per question

let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= numQuestions) {
        var random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
        } 
       setTimeout(() => {
        if (indexNumber < numQuestions) {
            NextQuestion(indexNumber);
        } else {
            handleEndGame();
        }
        resetOptionBackground();
    }, 1000);  
     
}



let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    var currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    var currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    var currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    var options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number until when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            var wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    var options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    var options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    var playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}




//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}