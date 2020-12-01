var tableRow = document.getElementsByTagName("tr");
var tablecell = document.getElementsByTagName("td");
var tableslot = document.querySelector(".slot");
const playerTurn = document.querySelector(".Your-Turn");
const reset = document.querySelector(".reset");
const turnDisc = playerTurn.previousElementSibling;
const player1NameElem = document.querySelector("#player-1-name");
const player2NameElem = document.querySelector("#player-2-name");
var player1, player2, player1Color, player2Color;
var currentPlayer = 1,
  counter = 0;
var player1Spots = [[], []];
var player2Spots = [[], []];
let isWin = false;

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
        player1Spots[0].push(row);
        player1Spots[1].push(column);
        changePlayerTurn(2);
        counter += 1;
        return checkWinner();
      }
      rows[0].style.backgroundColor = player2Color;
      player2Spots[0].push(row);
      player2Spots[1].push(column);
      changePlayerTurn(1);
      counter += 1;
      return checkWinner();
    }
  }
}

function checkWinner() {
  function checkPlayerSpots(player, spots, color) {
    let rowsColumns = [];
    spots.forEach(function (list) {
      const sorted = list.sort();
      rowsColumns.push(
        sorted.filter(function (value, index, self) {
          return self.indexOf(value) === index;
        })
      );
    });
    if (counter !== 42) {
      const entry1 = rowsColumns[0];
      const entry2 = rowsColumns[1];
      if (entry1.length === 4 && entry2.length === 4) {
        isWin = entry1.every(function (value, index, self) {
          if (index !== self.length - 1) {
            return (
              value - self[index + 1] === -1 &&
              entry2[index] - entry2[index + 1] === -1
            );
          }
          return (
            value - self[index - 1] === 1 &&
            entry2[index] - entry2[index - 1] === 1
          );
        });
      } else if (
        (entry1.length === 4 && entry2.length === 1) ||
        (entry1.length === 1 && entry2.length === 4)
      ) {
        function checkWin(data) {
          return data.every(function (value, index, self) {
            if (index !== self.length - 1) {
              return value - self[index + 1] === -1;
            }
            return value - self[index - 1] === 1;
          });
        }
        if (entry1.length === 4) {
          isWin = checkWin(entry1);
        } else if (entry2.length === 4) {
          isWin = checkWin(entry2);
        }
      }
      if (isWin) {
        playerTurn.textContent = `${player} wins! Reset game.`;
        console.log(`${player} wins! Reset game.`);
        turnDisc.style.backgroundColor = color;
        isWin = false;
        return disableBoard();
      }
    } else {
      playerTurn.textContent = `Draw! Reset game.`;
      console.log(`Draw! Reset game.`);
      turnDisc.style.backgroundColor = "black";
      return disableBoard();
    }
  }

  if (counter >= 7) {
    checkPlayerSpots(player1, player1Spots, player1Color);
    checkPlayerSpots(player2, player2Spots, player2Color);
  }
}

function disableBoard() {
  Array.prototype.forEach.call(tablecell, (cell) => {
    cell.removeEventListener("click", changeColor);
  });
}

function resetBoard() {
  currentPlayer = 1;
  counter = 0;
  isWin = false;
  player1Spots = [[], []];
  player2Spots = [[], []];
  startGame();
}

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
