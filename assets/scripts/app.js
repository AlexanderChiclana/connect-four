'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
const getFormFields = require('../../lib/get-form-fields')

$(() => {
  // your JS code goes here


  const gameBoard = [
    // left buffer
    { height: 3, col: [] },
    { height: 3, col: [] },
    { height: 3, col: [] },
    // playable
    { height: 3, col: [] },
    { height: 3, col: [] },
    { height: 3, col: [] },
    { height: 3, col: [] },
    { height: 3, col: [] },
    { height: 3, col: [] },
    { height: 3, col: [] },
    // right buffer
    { height: 3, col: [] },
    { height: 3, col: [] },
    { height: 3, col: [] }
  ]

  let turn = true

  let playerMove = 'B'

  const gameOver = function () {
    console.log('Game Over ' + playerMove + ' Wins')
    $('.grid-item').css('pointer-events', 'none')
  }

  const diagonalCheck = function (moveColumn, moveRow) {
    // first axis
    let axisPosPos = 0
    let axisNegNeg = 0
    // second axis
    let axisPosNeg = 0
    let axisNegPos = 0

    // checking the first axis
    for (let j = 0; j < 4; j++) {
      if (gameBoard[moveColumn].col[moveRow] === gameBoard[moveColumn + axisPosPos].col[moveRow + axisPosPos]) {
        axisPosPos++
      }
    }
    for (let j = 0; j < 4; j++) {
      if (gameBoard[moveColumn].col[moveRow] === gameBoard[moveColumn - axisNegNeg].col[moveRow - axisNegNeg]) {
        axisNegNeg++
      }
    }
    // checking the second axis
    for (let j = 0; j < 4; j++) {
      if (gameBoard[moveColumn].col[moveRow] === gameBoard[moveColumn + axisPosNeg].col[moveRow - axisPosNeg]) {
        axisPosNeg++
      }
    }
    for (let j = 0; j < 4; j++) {
      if (gameBoard[moveColumn].col[moveRow] === gameBoard[moveColumn - axisNegPos].col[moveRow + axisNegPos]) {
        axisNegPos++
      }
    }


    if ((axisNegNeg + axisPosPos - 1) > 3 || (axisNegPos + axisPosNeg - 1) > 3) {
      // console.log(playerMove + ' Wins diagonally')
      gameOver()
    }

  }


  const checkForWin = function (moveColumn, moveRow) {

    // Horizontal Win Check
    for (let j = 3; j < 7; j++) {

      if (gameBoard[j].col[moveRow] === playerMove && gameBoard[j + 1].col[moveRow] === playerMove &&
        gameBoard[j + 2].col[moveRow] === playerMove && gameBoard[j + 3].col[moveRow] === playerMove &&
        gameBoard[j].col[moveRow] === gameBoard[j + 1].col[moveRow] && gameBoard[j].col[moveRow] === gameBoard[j + 2].col[moveRow] &&
        gameBoard[j].col[moveRow] === gameBoard[j + 3].col[moveRow]
      ) {
        // console.log(playerMove + ' HORIZONTAL WIN')
        gameOver()
      }
    }
    // Vertical Win Check
    for (let i = 0; i < 5; i++) {
      if (gameBoard[moveColumn].col[i] === playerMove && gameBoard[moveColumn].col[i + 1] === playerMove &&
        gameBoard[moveColumn].col[i + 2] === playerMove && gameBoard[moveColumn].col[i + 3] === playerMove
      ) {
        // console.log(playerMove + ' WINS Vertically')
        // console.log(playerMove)
        gameOver()
      } else {
        // console.log('no match')
      }
    }
  }

  const drawBoard = function (moveColumn, moveRow) {
    // $(html, col is known, height is variable).html
    // $('someHTML').html(gameBoard[0].col[0])
    if (gameBoard[moveColumn].height < 10) {
      turn ? playerMove = 'B' : playerMove = 'R'
      $('.row-' + moveRow + '.column-' + moveColumn).text('O').addClass(playerMove)


      console.log(`${moveColumn} and ${moveRow}`)
    } else {
      $('.column-' + moveColumn).css('pointer-events', 'none')
    }
  }

  const movePiece = function (event) {
    const moveColumn = Number(event.target.getAttribute('data-col'))
    const moveRow = gameBoard[moveColumn].height

    turn ? gameBoard[moveColumn].col[gameBoard[moveColumn].height] = 'B' : gameBoard[moveColumn].col[gameBoard[moveColumn].height] = 'R'

    gameBoard[moveColumn].height++

    // console.log(gameBoard)
    // console.log(turn)

    // ordering might be off
    drawBoard(moveColumn, moveRow)

    checkForWin(moveColumn, moveRow)
    diagonalCheck(moveColumn, moveRow)

    // fallAnim(moveColumn, moveRow)

    turn = !turn
  }

  const clearBoard = function () {
    console.log('clearing')
    $('.grid-item').text('').removeClass('B').removeClass('R').css('pointer-events', 'auto')

    for (let i = 0; i < 13; i++) {
      gameBoard[i].height = 3
      gameBoard[i].col = []
    }
  }




  // $('.game-col-0').on('click', movePiece)
  $('.grid-item').on('click', movePiece)
  $('.reset').on('click', clearBoard)

})
