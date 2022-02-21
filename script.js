//timer start
var timeLeft = 75;
var timerID;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-quiz-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var shuffledQuestions, currentQuestionIndex;

//start button
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});


//timer countdown
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}

//start quiz

function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random () - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");

    timeTick();
    setNextQuestion();
};

//Next question
function setNextQuestion() {
    resetState ();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

//Show Questions
function showQuestion (question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};

//reset
function resetState () {
    nextButton.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    }
};

//answer function
function selectAnswer(e) {
    var selectButton = e.target;

    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
//double check this
    if (correct) {
        checkAnswerEl.innerHTML = "Great Job!";
    } else {
        checkAnswerEl.innerHTML = "Sorry, that was incorrect :(";
        if (timeLeft <= 10) {
            timeLeft=0;
        } else {
            timeLeft -= 10;
        }
    }

Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
})

if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
    checkAnswerEl.classList.remove("hide")
} else {
    startButton.classList.remove("hide")
} else {
    startButton.classList.remove("hide")
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

//saving scores
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time" + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your score is" + timeLeft;
    },2000)
};

var loadScores = function () {
    if (!savedScores) {
        return false;
    }
    savedScores = JSON.parse (savedScores);
    var initials = document.querySelector("#initials-field").ariaValueMax;
    var newScore = {
        score: timeLeft,
        initials:initials
    }
    savedScores.push(newScore);
    console.log(savedScores)


    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};
