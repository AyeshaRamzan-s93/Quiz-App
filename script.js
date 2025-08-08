
//An array of objects where each object contains a question and its answers

const questions = [
    {
        question: "HTML stands for?",
        answers: [
            { text: 'HyperText Markup Language', correct: true },
            { text: 'High Level Text Management Language', correct: false },
            { text: 'HomeTool Markup Language', correct: false },
            { text: 'Hyper Links and Text Markup Language', correct: false },
        ]
    },
    {
        question: "How do you create a function in JS?",
        answers: [
            { text: 'function:myFunction()', correct: false },
            { text: 'function myFunction()', correct: true },
            { text: 'function=myFunction()', correct: false },
            { text: 'None', correct: false },
        ]
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        answers: [
            { text: 'link tag', correct: false },
            { text: 'href tag', correct: false },
            { text: 'anchor tag', correct: true },
            { text: 'url tag', correct: false },
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: 'Java', correct: false },
            { text: 'Python', correct: false },
            { text: 'anchor tag', correct: false },
            { text: 'JavaScript', correct: true },
        ]
    }
];

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const quizBox = document.querySelector('.quiz');
const timerText = document.getElementById('timer');
const timeSpan = document.getElementById('time');


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;                                        //variable to store the reference to the setInterval timer 

//==========================  Start Button   ====================


startButton.addEventListener('click', () => {
    startButton.style.display = 'none';                // Hide Start button
    quizBox.style.display = 'block';                   // Show quiz area
    timerText.style.display = 'block';                 // Show timer
    startQuiz();
});


//======================= Start Quiz ============================

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = 'Next';
    showQuestion();
}


// ======================= Show Questions ============================


function showQuestion() {
    resetState();                                //To clear out previous answers/buttons from screen before adding new ones

    let currentQuestion = questions[currentQuestionIndex];                   //questions is array and currentQuestionIndex is tracking the question on which we are ..fetch the question object along with current Index
    console.log(questionElement);
    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;      //shows 1. --question usually starts from 1

    currentQuestion.answers.forEach(answer => {                      //Loop through answers array
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;              //dataset is used to store custom attributes
        }

        button.addEventListener('click', selectAnswer);      //click listener to each answer button and it will run selectAnswer() function
    });

    startTimer();
}


//======================== Reset State ==========================

function resetState() {
    clearInterval(timer);                               //built-in method in JS to stop a repeating task--stops the previous old timer
    timeLeft = 10;
    timeSpan.innerText = timeLeft;

    nextButton.style.display = 'none';                        //Hide next button 
    answerButtons.innerHTML = '';                             //Remover answers from the previous question
}


//========================= Start Timer ===================

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeSpan.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);                                //stops the interval from continuing
            autoSelect();
        }
    }, 1000);
}

//========================== Checking answer =========================

function selectAnswer(e) {
    clearInterval(timer);                                           //After hitting answer, it stops countdown

    const selectedBtn = e.target;                                   //Actual html button the user has clicked on 
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        selectedBtn.classList.add('correct');                           //CSS class usually green
        score++;                                                        //increment score
    } else {
        selectedBtn.classList.add('incorrect');
    }

    //HTML collection of all elements into real array
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true')                       //highlights the correct answer even if user select wrong one
        {
            button.classList.add('correct');
        }
        button.disabled = true;                              //disabled all the other buttons so user can't click multiple answers
    });

    nextButton.style.display = 'block';                     //shows the next button
}


//========================== Auto Select =================

function autoSelect() {
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');               //here the answer will turn into green 
        }
    });

    nextButton.style.display = 'block';
}


//===================== Handle Next Button =====================

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

//======================= Event trigger on next button ======================

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startButton.style.display = 'block';
    }
});


//======================  Show Score ======================

function showScore() {
    clearInterval(timer);
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.style.display = 'none';
    timerText.style.display = 'none';
    startButton.innerText = "Try Again";
    startButton.style.display = 'block';
}

