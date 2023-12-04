/*----- constants -----*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*----- app's state (variables) -----*/

let board;
let turn = "X";
let win;


/*Mes Variables*/ 
let square1;
let square2;
let square3;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll("#board div"));

/*----- event listeners -----*/
document.getElementById("board").addEventListener("click", handleTurn);
const messages = document.querySelector("h2");
document.getElementById("reset-button").addEventListener("click", init);

/*----- functions -----*/

function getWinner() {
  let winner = null;
  winningCombos.forEach(function (combo, index) {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    )
      /* 
      squares[combo[0]]
      squares[combo[1]]
      squares[combo[2]]
      ! Affichage de la barre (Fonctionnalité JavaScript)
      */

     if(combo == winningCombos[0]){
      square1 = document.createElement("div");
      squares[combo[0]].appendChild(square1)
     }
      
      




      winner = board[combo[0]];
  });
  return winner ? winner : board.includes("") ? null : "T";
}

function handleTurn() {
  let idx = squares.findIndex(function (square) {
    return square === event.target;
  });
  board[idx] = turn;
  turn = turn === "X" ? "O" : "X";
  win = getWinner();
  
  render();
}

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  render();
}

function render() {
  board.forEach(function (mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
  });
  messages.textContent =
    win === "T"
      ? `Égalité !`
      : win
      ? `${win} a gagné!`
      : `C'est le tour de ${turn}!`;
}

init();
