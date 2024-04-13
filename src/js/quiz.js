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