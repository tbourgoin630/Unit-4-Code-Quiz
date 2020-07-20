const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById ('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById ('answer-button')
const counterElement = document.getElementById("counter");

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', function() {
    currentQuestionIndex++
    setNextQuestion()
});

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    startTimer();
}


var counter = 60; // the number that the counter starts at

function startTimer(){
    var countdownTimer = setInterval(function(){
        console.log(counter);
        counter-- 
        counterElement.innerText = counter
        if (counter === 0) {
          console.log("game is over");
          // function that ends the game
          clearInterval(countdownTimer);
        }
      }, 1000);
      

}

function setNextQuestion() {
    //resetState()
    questionElement.innerHTML = '';
    answerButtonsElement.innerHTML = '';


    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
        
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong') 
}

const questions = [
    {
        question: 'what is 2+2',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        question: 'Commonly used date types DO NOT include:',
        answers: [
            { text: 'strings', corect: false },
            { text: 'booleans', corect: false },
            { text: 'alerts', corect: true },
            { text: 'numbers', corect: false },
        ]
    },
    {
        question: 'The condition in an if/else statement is enclosed within ___.',
        answers: [
            { text: 'quotes', corect: false },
            { text: 'curly brackets', corect: false },
            { text: 'parentheses', corect: true },
            { text: 'square brackets', corect: false },
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ___.',
        answers: [
            { text: 'numbers and strings', corect: false },
            { text: 'other arrays', corect: false },
            { text: 'booleans', corect: false },
            { text: 'all of the above', corect: true },
        ]
    },
    {
        question: 'String values must be enclosed within ___ when being assigned to variables.',
        answers: [
            { text: 'commas', corect: false },
            { text: 'curly brackets', corect: false },
            { text: 'quotes', corect: true },
            { text: 'parantheses', corect: false },
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: 'JavaScript', corect: false },
            { text: 'terminal/bash', corect: false },
            { text: 'for loops', corect: false },
            { text: 'console.log', corect: true },
        ]
    },
]