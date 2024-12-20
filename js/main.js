'use strict'

// Game elements
const MINE = '💣'
const FLAG = '🚩'

var gBoard = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInit() {
    gBoard = createBoard()
    renderBoard()

    // console.log(setMinesNegsCount(gBoard, 1, 1))

}

function createBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {

            var cell = {
                minesAroundCount: 0, // Will be calculated later
                isShown: false,
                isMine: false,
                isMarked: true
            }

            board[i][j] = cell
        }
    }



    board[2][2].isMine = board[0][0].isMine = true


    // placeMines(board)


    return board
}

// function placeMines(board) { //לנסות לשלב פונקציה טובה יותר מה-util
//     var minesPlaced = 0;
//     while (minesPlaced < gLevel.MINES) {
//         var randomRow = getRandomInt(0, gLevel.SIZE);
//         var randomCol = getRandomInt(0, gLevel.SIZE);

//         if (!board[randomRow][randomCol].isMine) {
//             board[randomRow][randomCol].isMine = true;
//             minesPlaced++;
//         }
//     }
// }



// function drawMine(num) {
//     size = num * num
//     var arr = []
//     arr.push()
// }

// drawMine(gLevel.SIZE)


function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < gBoard[i].length; j++) {
            strHTML += `
                <td class="cell"
                    onclick="onCellClicked(this, ${i}, ${j})"
                    oncontextmenu="cellRightClicked(event, ${i}, ${j})"
                    data-i="${i}" 
                    data-j="${j}">
                    ${gBoard[i][j].isMine ? MINE : setMinesNegsCount(gBoard, i, j)}
                </td>\n`;
        }
        strHTML += `</tr>\n`
    }

    const elBoard = document.querySelector('.board-body')
    elBoard.innerHTML = strHTML
}


function onCellClicked(elCell, i, j) {
    var cell = gBoard[i][j]

    if (elCell.classList.contains('flagged')) return


    if (cell.isShown) return
    cell.isShown = true

    elCell.classList.add('revealed')





    if (cell.isMine) {
        // console.log('Game Over')
        showRestartBtn()

        showAllMines()
    } else {
        const mineCount = setMinesNegsCount(gBoard, i, j)
        elCell.innerHTML = mineCount || ''
    }
}


function setMinesNegsCount(board, CellI, CellJ) {
    var count = 0

    for (var i = CellI - 1; i <= CellI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue
        for (var j = CellJ - 1; j <= CellJ + 1; j++) {
            if (i === CellI && j === CellJ) continue
            if (j < 0 || j >= gLevel.SIZE) continue
            var currCell = board[i][j]
            if (currCell.isMine) {
                count++
                // expandShown(board, i, j)
            }
        }
    }
    return count
}

// function expandShown(board, i, j) {


//     const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
//     console.log(elCell);
// }

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]
            if (cell.isMine) {
                const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
                elCell.classList.add('revealed')
                gBoard[i][j].innerHTML = MINE
            }
        }
    }
}

function showRestartBtn() { //לשנות את הפונקציות למשהו יותר יעיל (כמו בשיעור של שרון)
    var elBtn = document.querySelector('.btn-restart')
    elBtn.style.display = 'block'
}

function gameOver() {
    onInit()
    var elBtn = document.querySelector('.btn-restart')
    elBtn.style.display = 'none'
}

function cellRightClicked(event, i, j) {
    event.preventDefault(); // Prevent the default right-click menu

    const cell = gBoard[i][j]

    // Only allow marking if the cell is not revealed
    if (!cell.isShown) {
        cell.isMarked = !cell.isMarked // Toggle flag state

        const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)

        if (!cell.isMarked) {
            elCell.classList.add('flagged') // Apply flagged style
            elCell.innerHTML = FLAG    // Display flag icon
        } else {
            elCell.classList.remove('flagged'); // Remove flagged style
            // gBoard[i][j].isMine
            elCell.innerHTML = '💣' // Clear the cell
        }
    }
}

function checkGameOver() {
    if ()
}





// function renderCell(location, value) {
//     // Select the elCell and set the value
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
//     elCell.classList.add('revealed')
// }


