// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;
let shuffledQuestions = [];
let userScore = 0;
let savedData = [];

// Checks for data saved in local storage and loads it
if (localStorage.getItem('savedData')) {
    savedData = JSON.parse(localStorage.getItem('savedData'));
}

initializeQuiz();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);
document.querySelector('.saveButton').addEventListener('click', showSaveForm);
document.querySelector('.confirmSaveButton').addEventListener('click', saveData);

// Functions
function initializeQuiz() {
    shuffleQuestions(); // Shuffle the questions
    showQuestion();
}

function shuffleQuestions() {
    shuffledQuestions = questions.slice(); 
    shuffledQuestions.sort(() => Math.random() - 0.5); 
}

function showQuestion() {
    if (shuffledQuestions[currentQuestion]) {
        let q = shuffledQuestions[currentQuestion];

        let pct = Math.floor((currentQuestion / shuffledQuestions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }

        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    let correctOption = shuffledQuestions[currentQuestion].answer;

    if (clickedOption === correctOption) {
        e.target.style.backgroundColor = '#00FF00'; // Green color for correct answer
        correctAnswers++;
    } else {
        e.target.style.backgroundColor = '#FF0000'; // Red color for correct answer
    }

    // Disable click events after choosing an option
    document.querySelectorAll('.options .option').forEach(item => {
        item.removeEventListener('click', optionClickEvent);
    });

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1000);
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / shuffledQuestions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = "It's bad!";
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 60) {
        document.querySelector('.scoreText1').innerHTML = 'You can do better than this!';
        document.querySelector('.scorePct').style.color = '#ffa500';
    } else if(points >= 60 && points < 80) {
        document.querySelector('.scoreText1').innerHTML = 'Very good!';
        document.querySelector('.scorePct').style.color = '#FFF000';
    } else if(points >= 80) {
        document.querySelector('.scoreText1').innerHTML = 'Wonderful!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Got it right ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `You answered ${shuffledQuestions.length} questions and got ${correctAnswers} correct.`;

    // document.querySelector('.scoreArea').style.display = 'flex';
    document.querySelector('.scoreArea').style.display = 'flex';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    currentQuestion = 0;
    correctAnswers = 0;
    shuffleQuestions(); // Shuffle the questions again for the next quiz
    showQuestion();
}

function showSaveForm() {
    document.querySelector('.saveForm').style.display = 'flex';
}

function saveData() {
    let name = document.querySelector('.nameInput').value; 
    if (name.trim() === '') {
        alert('Please enter your name.');
        return;
    }

    let data = {
        name: name,
        score: Math.floor((correctAnswers / shuffledQuestions.length) * 100)
    };

    savedData.push(data);
    localStorage.setItem('savedData', JSON.stringify(savedData));

    alert('Score saved successfully!');
    document.querySelector('.saveForm').style.display = 'none';
    document.querySelector('.nameInput').value = '';

    // Clear previous list
    let scoreList = document.getElementById('scoreList');
    scoreList.innerHTML = '';

    // Display saved scores
    savedData.forEach(function(data, index) {
        let listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${data.name} - ${data.score}`;
        scoreList.appendChild(listItem);
    });
}

function clearData() {
    localStorage.removeItem('savedData');
    savedData = []; // Clears the local variable
    document.getElementById('scoreList').innerHTML = ''; // Clear the list in HTML
}