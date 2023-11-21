const questions  = [
    {
        question: "Which word is not used to describe feelings?",
        answers: [
            {text: "distressed", correct: false},
            {text: "amazed", correct: false},
            {text: "pale", correct: true},
            {text: "astonished", correct: false}
        ]

    },
    {
        question: "What grammar structure describes past habits?",
        answers: [
            {text: "would rather", correct: false},
            {text: "used to", correct: true},
            {text: "get used to", correct: false},
            {text: "had better", correct: false}
        ]

    },
    {
        question: "Which is the synonym of the word 'smart'?",
        answers: [
            {text: "intelligent", correct: true},
            {text: "bashful", correct: false},
            {text: "affectionate", correct: false},
            {text: "big-headed", correct: false}
        ]

    },
    {
        question: "Select an incorrect sentence",
        answers: [
            {text: "Children sribbled something on wallpaper at home.", correct: false},
            {text: "My phone is being charged on the countertop.", correct: false},
            {text: "I've been to Italy 3 times.", correct: false},
            {text: "It's hard to get used to work like this.", correct: true}
        ]

    },
    {
        question: "Which phrasal verb means to explain something quickly?",
        answers: [
            {text: "doze off", correct:  false},
            {text: "show off", correct: false},
            {text: "run over", correct: true},
            {text: "splurge on", correct: false}
        ]

    },
    {
        question: "How many tenses are there in English?",
        answers: [
            {text: "10", correct:  false},
            {text: "12", correct: true},
            {text: "9", correct: false},
            {text: "14", correct: false}
        ]

    },
    {
        question: "Pick the INCORRECT sentence",
        answers: [
            {text: "You would rather to purchase a new laptop, wouldn't you?", correct:  true},
            {text: "Having spent much time, we were able to get our car working", correct: false},
            {text: "I wish they would have give him a second chance", correct: false},
            {text: "She will go out with her friends once she has finished her homework", correct: false}
        ]

    },
    {
        question: "Which of the following idioms means to spend less money than usual?",
        answers: [
            {text: "be broke", correct:  false},
            {text: "make a fortune", correct: false},
            {text: "make ends meet", correct: false},
            {text: "tighten one's belt", correct: true}
        ]

    },
    {
        question: "Which grammar is used to express regret?",
        answers: [
            {text: "I wish", correct:  true},
            {text: "would rather", correct: false},
            {text: "get used to", correct: false},
            {text: "used to", correct: false}
        ]

    },
    {
        question: "The synonym of the word 'demanding'?",
        answers: [
            {text: "pisky", correct:  false},
            {text: "strenuous", correct: true},
            {text: "perplexing", correct: false},
            {text: "nifty", correct: false}
        ]

    }
];

let data_holder = [];




let wrong_answer = new Audio("./audio/zapsplat_multimedia_gameshow_buzzer_incorrect_buzz_low_pitched_001_91600.mp3");
let correct_answer = new Audio("./audio/zapsplat_multimedia_gameshow_correct_answer_bell_ping_chime_003_91612.mp3")

let progress = document.querySelector(".filler");
let questionElement = document.getElementById("question")
let answerButtons = document.getElementById("answer-buttons")
let nextButton = document.getElementById("next-btn")
let start_button = document.getElementById("start")

let user_answers = document.getElementById("user_answers");

let currentQuestionIndex = 0;
let score = 0;

document.querySelector(".progress").firstChild.textContent = `${questions.length} questions`

let modal = document.getElementById("myModal");
let start_again =  document.getElementById("startAgain");
let review = document.getElementById("review_btn");
let btn_close = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

start_again.onclick = function(){
    modal.style.display = "none";
    progress.style.width = "0px"
    startQuiz();
}

review.onclick = function(){
    modal.style.display = "none";
    user_answers.style.display = "block";
    questionElement.style.display = "none";
    nextButton.style.display = "none";
}


btn_close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
    }
}



function startQuiz(){
    
    questionElement.classList.remove("show_hide")
    answerButtons.style.display = "block";
    start_button.style.display = "none";
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next"
    showQuestion();
}




function fill_progress(){
    
   
    let progress_tracker = 0;

   let interval = setInterval(fill,0.05);
   
   function fill(){
    
        if(progress_tracker == 25 || progress.style.width === "248px"){
          clearInterval(interval);
        }
        else{
            progress_tracker++;
            
            let w = Number(progress.style.width.slice(0, progress.style.width.indexOf("p")));
            w++;
            let new_width = w + "px";
            progress.style.width = new_width;
        }
     }
   
   
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.textContent = questionNo + ". " + currentQuestion.question;
    
    
    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        
        
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    // let review_question = questionElement.cloneNode(true);
    // let review_buttons = answerButtons.cloneNode(true);
    // review_buttons.classList.add("review-answer-buttons");
    // user_answers.appendChild(review_question);
    // user_answers.appendChild(review_buttons);   
    
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    let selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        correct_answer.play();
        selectedBtn.style.backgroundColor = "lime";
        score++;
    }else {
        wrong_answer.play();
        selectedBtn.style.backgroundColor = "crimson"
    }
   Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true'){
        
        button.style.backgroundColor = "lime";
    }
    button.disabled = true;
   });
   nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    questionElement.style.color = "white";
    
    nextButton.innerHTML = "Start Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
        if(score >= 8){
            document.getElementById("feedback").textContent = `Amazing result! You scored ${score} out of ${questions.length}!`;
        }
        else if(score >= 5){
            document.getElementById("feedback").textContent = `Not bad, You score is ${score}. Keep learning!`;
        }
        else{
            
            document.getElementById("feedback").textContent = `You score is ${score}. Don't get upset! You can get better`;
        }
        modal.style.display = "block";

    }
}

nextButton.addEventListener("click", ()=>{
    
    if(currentQuestionIndex < questions.length){
        fill_progress();
        handleNextButton();
        
    }
    else{
        progress.style.width = "0px";
        
        startQuiz();
        
    }
})








