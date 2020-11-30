var tableRow = document.getElementsByTagName("tr");
var tablecell = document.getElementsByTagName("td");
var tableslot = document.querySelector(".slot");
const playerTurn = document.querySelector(".Your-Turn");
const reset = document.querySelector(".reset");
const turnDisc = playerTurn.previousElementSibling;
const player1NameElem = document.querySelector("#player-1-name");
const player2NameElem = document.querySelector("#player-2-name");
var player1, player2, player1Color, player2Color;
var currentPlayer = 1;
var player1Spots = [];
var player2Spots = [];

function changePlayerTurn(current) {
  currentPlayer = current;
  function setColorAndTurn(playerName, playerColor) {
    turnDisc.style.backgroundColor = playerColor;
    playerTurn.textContent = `${playerName}'s turn`;
  }
  switch (current) {
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

function changeColor(e) {
  let column = e.target.cellIndex;
  let rows = [];
  for (let i = 5; i > -1; i--) {
    if (tableRow[i].children[column].style.backgroundColor == "white") {
      rows.push(tableRow[i].children[column]);
      const row = rows[0].parentElement.rowIndex;
      if (currentPlayer === 1) {
        rows[0].style.backgroundColor = player1Color;
        player1Spots.push([row, column]);
        checkWinner();
        return changePlayerTurn(2);
      }
      rows[0].style.backgroundColor = player2Color;
      player2Spots.push([row, column]);
      checkWinner();
      return changePlayerTurn(1);
    }
  }
}

function checkWinner() {
  console.log({ player1Spots, player2Spots });
  let player1Win = 1;
  let player2Win = 1;
  if (player1Spots.length >= 4) {
    let player1PreviousRow = player1Spots[0][0];
    let player1PreviousColumn = player1Spots[0][1];
    player1Spots.forEach(function ([row, column]) {
      player1Win +=
        Math.abs(player1PreviousRow - row) +
        Math.abs(player1PreviousColumn - column);
      player1PreviousRow = row;
      player1PreviousColumn = column;
    });
    if (player1Win === 4) {
      playerTurn.textContent = `${player1} wins!`;
      console.log(`${player1} wins!`);
    }
  }
  if (player2Spots.length >= 4) {
    let player2PreviousRow = player2Spots[0][0];
    let player2PreviousColumn = player2Spots[0][1];
    player2Spots.forEach(function ([row, column]) {
      player2Win +=
        Math.abs(player2PreviousRow - row) +
        Math.abs(player2PreviousColumn - column);
      player2PreviousRow = row;
      player2PreviousColumn = column;
    });
    if (player2Win === 4) {
      playerTurn.textContent = `${player2} wins!`;
      console.log(`${player2} wins!`);
    }
  }
}

function disableBoard() {}

function resetBoard() {}

function startGame() {
  Array.prototype.forEach.call(tablecell, (cell) => {
    cell.addEventListener("click", changeColor);
    cell.style.backgroundColor = "white";
  });

  for (let i = 0; i < tablecell.length; i++) {
    tablecell[i].addEventListener("click", (e) => {
      const row = e.target.parentElement.rowIndex;
      const column = e.target.cellIndex;
      console.log(`${row}, ${column}`);
    });
  }

  if (!player1) {
    player1 = prompt("Player one: Enter your name, You will be blue");
    player1NameElem.textContent = player1;
  }

  if (!player2) {
    player2 = prompt("Player two: Enter your name, you will be yellow");
    player2NameElem.textContent = player2;
  }

  player1Color = "#004cda";
  player2Color = "#fffb00";
  changePlayerTurn(currentPlayer);
}

startGame();
