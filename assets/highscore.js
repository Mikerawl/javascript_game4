var highScore = document.getElementById("high-scores");
var clear
var 

function highScore() {
    var saveScores = JSON.parse(localStorage.getItem("player-scores"))
 
 var list=""
    
saveScores.forEach((score) => {
    list += `<li ></li>`;
  });

  .innerHTML = list;

}