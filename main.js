let cell = document.querySelectorAll(".cell");
let statusText = document.querySelector(".status-text")
let restart = document.querySelector(".restart")

let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let running = false;
let currentPlayer = "X";
let options = ["", "", "", "", "", "", "", "", "",];
initializeGame()
function initializeGame(){
  cell.forEach( cell => cell.addEventListener("click", cellClicked));
  restart.addEventListener("click", restartGame);
  statusText.innerHTML = `${currentPlayer}'s turn`
  running = true;
}

function cellClicked(){
  let cellIndex = parseInt(this.getAttribute("cellIndex"));
  if(options[cellIndex] != "" || !running){
    return;
  }
  console.log("cell clicked");
  updateCell(this, cellIndex)
  checkWinner()
}

function updateCell (cell, index) {
  options[index] = currentPlayer;
  cell.innerHTML = currentPlayer;
  changePlayer()
}

function changePlayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  console.log(currentPlayer);
  statusText.innerHTML = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    let condition = winConditions[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];
    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.innerHTML = (currentPlayer === "X") ? "O won" : "X won";
    running = false;
  } else if (!options.includes("")) {
    statusText.innerHTML = `It's a draw`;
    running = false;
  }
}


function restartGame(){
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  statusText.innerHTML = `${currentPlayer}'s turn`;
  cell.forEach(cell => {
    cell.innerHTML = "";
  });
  running = true;
}
