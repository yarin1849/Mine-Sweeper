"use strict";

// Game elements
const MINE = "💣";
const FLAG = "🚩";

var gBoard = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true,
};

var gLevel = {
    SIZE: 4,
    MINES: 2,
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
};

function onInit() {
    gBoard = createBoard();
    renderBoard();

    // console.log(setMinesNegsCount(gBoard, 1, 1))
}

function createBoard() {
    const board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 0, // Will be calculated later
                isShown: false,
                isMine: false,
                isMarked: true,
            };
            board[i][j] = cell;
        }
    }

    // board[2][2].isMine = board[0][0].isMine = true;

    placeMines(board)

    return board;
}

function choseLevel() {
    const levelChoice = prompt("Choose a level:\n1. Beginner (4x4 with 2 Mines)\n2. Medium (8x8 with 14 Mines)\n3. Expert (12x12 with 32 Mines)");
    switch (parseInt(levelChoice)) {
        case 1:
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;
        case 2:
            gLevel.SIZE = 8;
            gLevel.MINES = 14;
            break;
        case 3:
            gLevel.SIZE = 12;
            gLevel.MINES = 32;
            break;
        default:
            alert("Invalid choice, defaulting to Beginner.");
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
    }
    onInit();
}

function placeMines(board) { //לנסות לשלב פונקציה טובה יותר ה-util
    var minesPlaced = 0;
    while (minesPlaced < gLevel.MINES) {
        var randomRow = getRandomInt(0, gLevel.SIZE);
        var randomCol = getRandomInt(0, gLevel.SIZE);

        if (!board[randomRow][randomCol].isMine) {
            board[randomRow][randomCol].isMine = true;
            minesPlaced++;
        }
    }
}

// function drawMine(num) {
//     size = num * num
//     var arr = []
//     arr.push()
// }

// drawMine(gLevel.SIZE)

function renderBoard() {
    var strHTML = "";
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < gBoard[i].length; j++) {
            strHTML += `
                <td class="cell"
                    onclick="onCellClicked(this, ${i}, ${j})"
                    oncontextmenu="cellRightClicked(event, ${i}, ${j})"
                    data-i="${i}" 
                    data-j="${j}">
                    ${gBoard[i][j].isMine ? MINE : setMinesNegsCount(gBoard, i, j)
                }
                </td>\n`;
        }
        strHTML += `</tr>\n`;
    }

    const elBoard = document.querySelector(".board-body");
    elBoard.innerHTML = strHTML;
}

var countShown = 0;
function onCellClicked(elCell, i, j) {
    var cell = gBoard[i][j];

    // Prevent actions on already revealed or flagged cells
    if (cell.isShown || elCell.classList.contains("flagged")) return;

    // Reveal the clicked cell
    cell.isShown = true;
    elCell.classList.add("revealed");

    // If the clicked cell is a mine
    if (cell.isMine) {
        elCell.innerHTML = MINE; // Show the mine
        showRestartBtn();       // Display restart button
        showAllMines();         // Reveal all mines
        return;                 // Exit, no further actions
    }

    // Get minesAroundCount
    const mineCount = setMinesNegsCount(gBoard, i, j);

    // Render empty for zero or number otherwise
    elCell.innerHTML = mineCount === 0 ? '' : mineCount;

    // Expand neighbors if no mines are around
    if (mineCount === 0) {
        expandShown(gBoard, elCell, i, j);
    }
    countShown++;

    // Increment shown cells count
    checkGameOver();

}



function setMinesNegsCount(board, CellI, CellJ) {
    var count = 0;

    for (var i = CellI - 1; i <= CellI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue;
        for (var j = CellJ - 1; j <= CellJ + 1; j++) {
            if (i === CellI && j === CellJ) continue;
            if (j < 0 || j >= gLevel.SIZE) continue;
            var currCell = board[i][j];
            if (currCell.isMine) {
                count++;
            }
        }
    }
    return count;
}

// function expandShown(board, i, j) {

//     const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
//     console.log(elCell);
// }

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            if (cell.isMine) {
                const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
                elCell.classList.add("revealed");
                gBoard[i][j].innerHTML = MINE;
            }
        }
    }
}

function showRestartBtn() {
    //לשנות את הפונקציות למשהו יותר היעיל (כמו בשיעור של שרון)
    var elBtn = document.querySelector(".btn-restart");
    elBtn.style.display = "block";
    console.log(elBtn);

    var elLevelBtn = document.querySelector(".btn-level");
    elLevelBtn.style.display = "none";

}

function gameOver() {
    onInit();
    var elBtn = document.querySelector(".btn-restart");
    elBtn.style.display = "none";

    var elLevelBtn = document.querySelector(".btn-level");
    elLevelBtn.style.display = "block";
}

var count = 0;

function cellRightClicked(event, i, j) {
    event.preventDefault();

    const cell = gBoard[i][j];

    if (!cell.isShown) {
        cell.isMarked = !cell.isMarked;

        const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);

        if (!cell.isMarked) {
            elCell.classList.add("flagged");
            elCell.innerHTML = FLAG;
            if (cell.isMine) {
                console.log("mark");
                count++;
            }
        } else {
            elCell.classList.remove("flagged");
            elCell.innerHTML = "💣";
            if (cell.isMine) {
                console.log("unMark");
                count--;
            }
        }
        checkGameOver()

    }
}
function checkGameOver() {
    var ShownCells = gLevel.SIZE * gLevel.SIZE - gLevel.MINES;
    console.log('gLevel.SIZE: ', gLevel.SIZE);
    console.log('gLevel.MINES: ', gLevel.MINES);
    console.log('ShownCells: ', ShownCells);
    console.log('count: ', count);
    console.log('countShown: ', countShown);



    if (gLevel.MINES === count && ShownCells === countShown) {
        alert("YOU WIN!")
        // console.log("winner"); //יופעל כאשר ניצחתי במשחק

    }
}




function expandShown(board, elCell, CellI, CellJ) {
    for (var i = CellI - 1; i <= CellI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue
        for (var j = CellJ - 1; j <= CellJ + 1; j++) {
            if (i === CellI && j === CellJ) continue
            if (j < 0 || j >= gLevel.SIZE) continue

            var currCell = board[i][j]
            if (currCell.isShown) continue
            countShown++

            currCell.isShown = true;
            const elNeighbor = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
            elNeighbor.classList.add("revealed")

            const mineCount = setMinesNegsCount(board, i, j)
            elNeighbor.innerHTML = mineCount === 0 ? '' : mineCount

            if (mineCount === 0) {
                expandShown(board, elNeighbor, i, j);
            }
        }
    }
}
