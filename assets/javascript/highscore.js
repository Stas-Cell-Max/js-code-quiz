           // Get the element with the ID "view-high-scores" and store it in the scoresBtn variable
let scoresBtn = document.querySelector("#view-high-scores");

           // Function to display high scores
function printHighscores() {
           // Retrieve high scores from local storage or initialize an empty array if no scores exist
    let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
          // Sort high scores in descending order based on the "score" property
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

         // Loop through high scores and create a list item for each score
    highscores.forEach(function (score) {
        let liTag = document.createElement("li");
        liTag.textContent = score.name + " - " + score.score;

         // Get the <ol> element with the ID "highscores" and append the list item
        let olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

          // Function to clear previous high scores when users click "Clear Highscores"
function clearHighscores() {
          // Remove the "highscores" key from local storage
    window.localStorage.removeItem("highscores");
    
           // Reload the page to clear the displayed high scores
    window.location.reload();
}

           // Attach a click event listener to the element with the ID "clear" to clear high scores
document.getElementById("clear").onclick = clearHighscores;

           // Call the printHighscores function to display high scores when the page loads
printHighscores();