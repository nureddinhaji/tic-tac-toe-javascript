let currentPlayer;
let xScore = 0;
let oScore = 0;
let countOfRows;
let cellsCount;
let turnsCount = 0;

const cells = document.querySelector(".cells");
const container = document.querySelector(".container");

let gameBoard = [];


function createStartScreen() {
    cells.innerHTML = `<div class="start"><div class="cells-count"><label for="cells-count-input">Choose the number of rows you want to start the game with.</label><input type="number" class="cells-count-input" name="cells-count-input" id="cells-count-input" value="3" min="3"/></div><div class="start-with"><p>Start the game with</p><fieldset><input type="radio" name="start-with-input" id="start-with-x" value="X" checked><label for="start-with-x">X</label></fieldset><fieldset><input type="radio" name="start-with-input" id="start-with-o" value="O"><label for="start-with-o">O</label></fieldset></div><button class="start-button">Start<svg class="start-button-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.011 6.215c-1.711-.009-3.86.918-5.499 2.557-.625.625-1.176 1.355-1.601 2.174 1.479-1.119 3.057-1.47 4.903-.434.544-1.437 1.27-2.9 2.197-4.297zm9.785 9.773c-1.516.991-3.007 1.706-4.297 2.21 1.036 1.848.686 3.424-.434 4.902.819-.424 1.549-.975 2.175-1.602 1.644-1.642 2.572-3.796 2.556-5.51zm6.152-15.946c-.412-.028-.816-.042-1.213-.042-8.602 0-13.498 6.558-15.28 11.833l4.728 4.729c5.428-1.946 11.817-6.661 11.817-15.172 0-.439-.017-.888-.052-1.348zm-9.888 9.91c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0 .391 1.023 0 1.414-1.024.39-1.414 0zm2.828-2.828c-.781-.78-.781-2.047 0-2.828s2.048-.781 2.828 0c.781.781.781 2.047 0 2.828s-2.047.781-2.828 0zm-14.919 12.454l-.906-.906 5.208-5.188.906.906-5.208 5.188zm4.979 1.857l-.906-.906 3.636-3.664.906.906-3.636 3.664zm-6.042 2.565l-.906-.906 6.448-6.438.906.906-6.448 6.438z"/></svg></button></div>`
    document.querySelector(".start-button").addEventListener("click", startGame);
    xScore = 0;
    oScore = 0;
    document.querySelector(".player--x .player__score").textContent = 0;
    document.querySelector(".player--o .player__score").textContent = 0;
    playAgain();
};
createStartScreen();
document.querySelector(".button--exit").addEventListener("click", createStartScreen)
// Create game board array
function createGameBoard(countOfRows) {
    for(let i=0; i < countOfRows; i++) {
        gameBoard.push([]);
        for(let e=0 ; e<countOfRows;e++){
            gameBoard[i].push("_")
        }
    }
}
function startGame() {
    countOfRows = document.querySelector(".cells-count-input").value ;
    cellsCount = countOfRows ** 2;

    currentPlayer = document.querySelector("input[name='start-with-input']:checked").value;
    selectActivePlayer(currentPlayer)

    // Change count of rows in css
    document.documentElement.style.setProperty('--rows-count', countOfRows);

    let cellsContainer = document.createElement("div");
    cellsContainer.classList.add("cells__container");

    for(let i=0 ; i < cellsCount ; i++) {
        let cellHtml = `<button class="cell"></button>`;
        let cell = document.createRange().createContextualFragment(cellHtml);

        cell.querySelector(".cell").addEventListener("click", (event) => {
            cellHandler(event, i);
        });
        cellsContainer.appendChild(cell);
    }
    cells.innerHTML = "";
    cells.appendChild(cellsContainer);
    createGameBoard(countOfRows);
    
}



// Create a popup function
function createPopup(message) {
    const drawPopup = `<div class='popup'><p class='popup__message'>${message}<p><div class='popup__buttons'><button class='popup__button popup__button--playagain'>Play Again</button><button class='popup__button popup__button--exite'>Exit</button></div></div>`;
    container.insertAdjacentHTML("beforeend", drawPopup);
    document.querySelector(".popup__button--playagain").addEventListener("click", playAgain);
    document.querySelector(".popup__button--exite").addEventListener("click", createStartScreen)
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

document.querySelector(".button--reset").addEventListener("click", playAgain)

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
