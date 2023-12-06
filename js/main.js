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

// Mes variables 
let victoireJ1 = document.querySelector("#pointsX");
let victoireJ2 = document.querySelector("#pointsO");

//Affiche le nombre de parties joués sur l'ordinateur
let nbPartiesJoue = document.querySelector("#nbrePartieJoué");
nbPartiesJoue.innerHTML = ("Nombre de parties joués sur ce PC : " + localStorage.nbParties);

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
    if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
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

  if (win != null) {
    if (win == "X") {
      //Si le storage est existant (Victoire des X) :
      if (sessionStorage.victoireX) {
        sessionStorage.victoireX = Number(sessionStorage.victoireX) + 1;
      }
      else {
        sessionStorage.victoireX = 1;
      }

      victoireJ1.innerHTML = ("Points X : " + sessionStorage.victoireX);
    }
    else {
      //Si le storage est existant (Victoire des O) :
      if (sessionStorage.victoireO) {
        sessionStorage.victoireO = Number(sessionStorage.victoireO) + 1;
      }
      else {
        sessionStorage.victoireO = 1;
      }

      victoireJ2.innerHTML = ("Points O : " + sessionStorage.victoireO);
    }
    //Si le storage est existant (Nombre de parties joués) :
    if (localStorage.nbParties) {
      localStorage.nbParties = Number(localStorage.nbParties) + 1;
    } else {
      localStorage.nbParties = 1;
    }
    nbPartiesJoue.innerHTML = ("Nombre de parties joués sur ce PC : " + localStorage.nbParties);
  }

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



