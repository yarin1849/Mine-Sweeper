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

    return board
}


function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            const mineCount = setMinesNegsCount(gBoard, i, j)
            var className = cell
            strHTML += `\t<td class="cell ${className}"
                             onclick="onCellClicked(this, ${i}, ${j})"
                             data-count="${mineCount}">`
            if (cell.isMine)
                strHTML += '💣'
            else {
                strHTML += `${mineCount}`
            }

            strHTML += `</td>\n`
        }
        strHTML += `</tr>\n`
    }

    // const elCount = document.querySelector('')
    const elBoard = document.querySelector('.board-body')
    elBoard.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
    var cell = gBoard[i][j]

    if (cell.isShown) return
    cell.isShown = true

    elCell.classList.add('revealed')



    if (cell.isMine) {
        console.log('Game Over')
        cell.innerHTML = MINE
        showAllMines()
    }

    else {
        console.log(setMinesNegsCount(gBoard, i, j))
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

function expandShown(board, i, j) {


    const elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    console.log(elCell);

    // elCell.classList.add('shown')

    // elCell.innerText = SHOW
}

function showAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine)
                gBoard[i][j].innerHTML = MINE
            // gBoard[i][j].isShown = true
            console.log(gBoard[i][j], i, j);

        }
    }
}

// function highlightAvailableSeatsAround(board, i, j) {
//     const elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
//     elCurrCell.classList.add('highlight')
//     elCurrCell.innerText = SEAT

//     setTimeout(() => {
//         elCurrCell.classList.remove('highlight')
//         elCurrCell.innerText = ''

//     }, 2500)
// }
