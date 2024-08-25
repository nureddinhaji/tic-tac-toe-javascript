let currentPlayer = "X";
let xScore = 0;
let oScore = 0;
let countOfRows;
let cellsCount;
let turnsCount = 0;

const startButton = document.querySelector(".start-button");
const rowsCountInput = document.querySelector(".cells-count-input");
const cells = document.querySelector(".cells");
const container = document.querySelector(".container");

let gameBoard = [];

// Start Game Function
// -----------------------

// Create game board array
function createGameBoard(countOfRows) {
    for(let i=0; i < countOfRows; i++) {
        gameBoard.push([]);
        for(let e=0 ; e<countOfRows;e++){
            gameBoard[i].push("_")
        }
    }
}
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
    createGameBoard(countOfRows);
    selectActivePlayer(currentPlayer)
}

startButton.addEventListener("click", startGame);


// Create a popup function
function createPopup(message) {
    const drawPopup = `<div class='popup'><p class='popup__message'>${message}<p><div class='popup__buttons'><button class='popup__button popup__button--playagain'>Play Again</button><button class='popup__button'>Exite</button></div></div>`;
    container.insertAdjacentHTML("beforeend", drawPopup);
    document.querySelector(".popup__button--playagain").addEventListener("click", playAgain)
}

function selectActivePlayer(currentPlayer) {
    document.querySelector(".player--active")?.classList.remove("player--active");
    if(currentPlayer === "X") {
        document.querySelector(".player--x")?.classList.add("player--active");
    } else {
        document.querySelector(".player--o")?.classList.add("player--active");
    }
}

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



// Check if there is a winner
function isThereWinner(currentPlayer) {
    if(checkRows(currentPlayer)) return true;
    if(checkColumns(currentPlayer)) return true;
    if(checkDiagonal(currentPlayer)) return true;
    if(checkInversDiagonal(currentPlayer)) return true;
    return false
}

// Function to check if there is a winner in rows
function checkRows(currentPlayer) {
    let column = 0;
    for(row=0; row < countOfRows; row++) {
        while(column < countOfRows) {
            const cell = gameBoard[row][column];
            if(cell !== currentPlayer) {
                column = 0;
                break;
            }
            column++
        }
        if(column == countOfRows) {
            return true
        }
    }
}

// Function to check if there is a winner in columns
function checkColumns(currentPlayer) {
    let row = 0;
    for(column=0; column < countOfRows; column++) {
        while(row < countOfRows) {
            const cell = gameBoard[row][column];
            if(cell !== currentPlayer) {
                row = 0;
                break;
            }
            row++
        }
        if(row == countOfRows) {
            return true
        }
    }
}

// Function to check if there is a winner in diagonal
function checkDiagonal(currentPlayer) {
    let row = 0;
        while(row < countOfRows) {
            const cell = gameBoard[row][row];
            if(cell !== currentPlayer) {
                row = 0;
                break;
            }
            row++
        if(row == countOfRows) {
            return true
        }
    }
}

// Function to check if there is a winner in inverse diagonal
function checkInversDiagonal(currentPlayer) {
    let row = 0;
        while(row < countOfRows) {
            const cell = gameBoard[row][countOfRows - (row + 1)];
            if(cell !== currentPlayer) {
                row = 0;
                break;
            }
            row++
        if(row == countOfRows) {
            return true
        }
    }
}


function playAgain() {
    turnsCount = 0;
    document.querySelector(".popup")?.remove();
    gameBoard = [];
    createGameBoard(countOfRows);
    document.querySelectorAll(".cell").forEach((cell) => {
        cell.className = "cell";
        cell.textContent = "";
        cell.disabled = false;
    })
}


// Cell Handler Function
// --------------------------

function cellHandler(event, index) {
    const cell = event.target;

    // Update Gamescreen
    updateGameScreen(cell, currentPlayer);

    // Update Gameboard
    updateGameBoard(index, countOfRows);
    turnsCount ++ 
    if(isThereWinner(currentPlayer)) {
        createPopup(`${currentPlayer} is win.`)
        if(currentPlayer === "X") {
            xScore++
            document.querySelector(".player--x .player__score").textContent = xScore
        } else {
            oScore++
            document.querySelector(".player--o .player__score").textContent = oScore
        }
        return;
    } else if (turnsCount === cellsCount) {
        createPopup("It is a tie.")
        return;
    }

    // Change the current player
    if(currentPlayer === "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X"
    }
    selectActivePlayer(currentPlayer)
}
