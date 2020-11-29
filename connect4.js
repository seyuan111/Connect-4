console.log('Welcome to Connect-4!')

var tableflow = document.getElementsByTagName("tr");
var tablecell = document.getElementsByTagName("td");
var tableslot = document.querySelector('.slot');
const playerturn = document.querySelector(".Your-Turn");
const reset = document.querySelector(".reset");

for(let i = 0; i < tablecell.length; i++){
    tablecell[i].addEventListener('.click', (e) =>{
        console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`);
    });
}

while(!player1){
    var player1 = prompt('Player one: Enter your name, You will be blue');
}

player1Color = 'blue';

while(!player2){
    var player2 = prompt("Player two: Enter your name, you will be yellow");
}

player2Color = 'yellow';

var currentPlayer = 1;
playerTurn.textContent = `${player1}'s turn`;

Array.prototype.forEach.call(tablecell, (cell) => {
    cell.addEventListener('click', changeColor);
    cell.style.backgroundColor = 'white';
})

function changeColor(e){
    let column = e.target.cellIndex;
    let row = [];

    for(let i = 5; i > -1; i--){
        if(tableRow[i].children[column].style.backgroundColor == 'white'){
            row.push(tableRow[i].children[column]);
            if(currentPlayer === 1){
                row[0].style.backgroundColor = player1Color;
                playerTurn.textContent = `${player2}'s turn`;
                return currentPlayer = 2;
            }else{
                row[0].style.backgroundColor = player1Color;
                playerTurn.textContent = `${player1}'s turn`;
                return currentPlayer = 1;
            }
        }
    }
}