let currentPlayer = "X";
let countOfRows;
let cellsCount;
let turnsCount = 0;

const startButton = document.querySelector(".start-button");
const rowsCountInput = document.querySelector(".cells-count-input");
const cells = document.querySelector(".cells");
const container = document.querySelector(".container");

const drawPopup = `<div class='popup'><p class='popup__message'>It is a draw<p><div class='popup__buttons'><button class='popup__button'>Play Again</button><button class='popup__button'>Exite</button></div></div>`;

const gameBoard = [];

// Start Game Function
// -----------------------

const startGame = () => {
    countOfRows = rowsCountInput.value ;
    cellsCount = countOfRows ** 2;

    // Change count of rows in css
    document.documentElement.style.setProperty('--rows-count', countOfRows);

    let cellsContainer = document.createElement("div");
    cellsContainer.classList.add("cells__container");

    for(let i=0 ; i < cellsCount ; i++) {
        let cellHtml = `<button class="cell"></button>`;
        let cell = document.createRange().createContextualFragment(cellHtml);

        cell.querySelector(".cell").addEventListener("click", (event) => {
            cellHandler(event, i)
        });
        cellsContainer.appendChild(cell)
    }
    cells.innerHTML = "";
    cells.appendChild(cellsContainer);
    for(let i=0; i < countOfRows; i++) {
        gameBoard.push([]);
        for(let e=0 ; e<countOfRows;e++){
            gameBoard[i].push("_")
        }
    }
    console.log(gameBoard)
}

startButton.addEventListener("click", startGame);

// Update Gameboard Function
function updateGameBoard(index, countOfRows) {
    const row = Math.floor(index / countOfRows);
    const col = index % countOfRows;

    gameBoard[row][col] = currentPlayer;
}

// Update Gamescreen Function
function updateGameScreen(cell, currentPlayer) {
    cell.textContent = currentPlayer;
    cell.disabled = true;
    cell.classList.add(currentPlayer);
}







// Cell Handler Function
// --------------------------

function cellHandler(event, index) {
    const cell = event.target;

    // Update Gamescreen
    updateGameScreen(cell, currentPlayer);

    // Update Gameboard
    updateGameBoard(index, countOfRows);
    
    if (turnsCount == cellsCount) {
        container.insertAdjacentHTML("beforeend", drawPopup);
    }

    // Increse turns by one
    turnsCount ++ 

    // Change the current player
    if(currentPlayer === "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
}
