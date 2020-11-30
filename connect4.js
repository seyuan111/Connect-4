var tableflow = document.getElementsByTagName("tr");
var tablecell = document.getElementsByTagName("td");
var tableslot = document.querySelector(".slot");
const playerTurn = document.querySelector(".Your-Turn");
const reset = document.querySelector(".reset");
const turnDisc = playerTurn.previousElementSibling;
var player1, player2, player1Color, player2Color;

function changePlayerTurn(currentPlayer) {
  function setColorAndTurn(playerName, playerColor) {
    turnDisc.style.backgroundColor = playerColor;
    playerTurn.textContent = `${playerName}'s turn`;
  }
  switch (currentPlayer) {
    case 1: {
      setColorAndTurn(player1, player1Color);
      break;
    }
    case 2: {
      setColorAndTurn(player2, player2Color);
      break;
    }
    default:
      break;
  }
}

Array.prototype.forEach.call(tablecell, (cell) => {
  cell.addEventListener("click", changeColor);
  cell.style.backgroundColor = "white";
});

function changeColor(e) {
  let column = e.target.cellIndex;
  let row = [];

  for (let i = 5; i > -1; i--) {
    if (tableRow[i].children[column].style.backgroundColor == "white") {
      row.push(tableRow[i].children[column]);
      if (currentPlayer === 1) {
        row[0].style.backgroundColor = player1Color;
        return changePlayerTurn(2);
      }
      row[0].style.backgroundColor = player2Color;
      return changePlayerTurn(1);
    }
  }
}

function startGame() {
  for (let i = 0; i < tablecell.length; i++) {
    tablecell[i].addEventListener(".click", (e) => {
      console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    });
  }

  if (!player1) {
    player1 = prompt("Player one: Enter your name, You will be blue");
  }

  player1Color = "#004cda";

  if (!player2) {
    player2 = prompt("Player two: Enter your name, you will be yellow");
  }

  player2Color = "#fffb00";

  var currentPlayer = 1;
  changePlayerTurn();
}

startGame();
