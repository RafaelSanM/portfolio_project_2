document.addEventListener('DOMContentLoaded', function() {
    // Retrieves saved data from local storage
    let savedData = JSON.parse(localStorage.getItem('savedData'));

    // Check for saved data
    if (savedData && savedData.length > 0) {
        let scoreList = document.getElementById('scoreList');

        // Displays each saved score in the list
        savedData.forEach(function(data) {
            let listItem = document.createElement('li');
            listItem.style.fontWeight = "bold";
            listItem.textContent = `${data.name} - ${data.score}`;
            scoreList.appendChild(listItem);
        });
    } else {
        // If there is no saved data, displays a message indicating that there are no saved scores
        let noScoresMessage = document.createElement('p');
        noScoresMessage.textContent = 'No scores saved yet.';
        noScoresMessage.style.color = "#ffffff";
        noScoresMessage.style.textAlign = "center";
        noScoresMessage.style.textTransform = "uppercase";
        document.body.appendChild(noScoresMessage);
    }
});