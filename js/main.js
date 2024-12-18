'use strict'

var gBoard

var gLevel = {
    SIZE: 4,
    MINES: 2
}

// Game elements
const MINE = '💣'
const FLAG = '🚩'



function onInit() {
    gBoard = createBoard()
    renderBoard()
    // console.log(setMinesNegsCount(gBoard, 1, 1))



}

function createBoard() {
    const board = []
    var count = 0
    var cell
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            // count = (gBoard, i, j)

            cell = board[i][j]
            // console.log((gBoard, i, j)); //fix it 
            board[i][j] = {
                minesAroundCount: 0, // Will be calculated later
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }
    board[2][2] = MINE
    board[0][0] = MINE
    return board
}


function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard.length; j++) {
            const cell = gBoard[i][j]
            var className = (cell === 'P') ? 'pressed' : ''
            strHTML += `\t<td class="cell ${className}"
                             onclick="onCellClicked(this, ${i}, ${j})" 
                            data-i="${i}" data-j="${j}" >`
            if (cell === gBoard[0][0])
                strHTML += '💣'

            strHTML += `</td>\n`
        }
        strHTML += `</tr>\n`
    }


    const elBoard = document.querySelector('.board-body')
    elBoard.innerHTML = strHTML
}

function onCellClicked() {
    console.log('hello');
    // setMinesNegsCount(gBoard, i, j)
}

function setMinesNegsCount(board, CellI, CellJ) {
    var count = 0

    for (var i = CellI - 1; i <= CellI + 1; i++) {
        if (i < 0 || i >= gLevel.SIZE) continue
        for (var j = CellJ - 1; j <= CellJ + 1; j++) {
            if (i === CellI && j === CellJ) continue
            if (j < 0 || j >= gLevel.SIZE) continue
            var currCell = board[i][j]
            if (currCell === MINE) {
                count++
            }
        }
    }
    return count
}



