'use strict';

const gLevel = { SIZE: 4, MINES: 2 };
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 };
let gBoard = null;
let gLives = 3;
let gTimerInterval = null;

function initGame() {
  console.log('onInit()');

  // initGameSettings();
  gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE, gLevel.MINES);
  renderBoard(gBoard);

  gLives = 3;

  // activate game
  gGame.isOn = true;

  // console.table(gBoard);
}

function onStartGameClick() {
  initGame();
}

function onLevelClick(level) {
  switch (level) {
    case 'Beginner':
      gLevel.SIZE = 4;
      gLevel.MINES = 2;
      break;
    case 'Medium':
      gLevel.SIZE = 8;
      gLevel.MINES = 14;
      break;
    case 'Expert':
      gLevel.SIZE = 12;
      gLevel.MINES = 32;
      break;
  }
}

function showAllCells(gBoard) {}

function checkGameOver() {
  for (var i = 0; i < gLevel.SIZE; i++) {
    for (var j = 0; j < gLevel.SIZE; j++) {
      const cell = gBoard[i][j];

      if (cell.isMine && !cell.isMarked) return false;
      if (!cell.isMine && !cell.isShown) return false;
    }
  }
  gameIsOver();

  return true;
}

function gameIsOver() {
  gGame.isOn = false;
  stopTimer();
}

// function expandShow(gBoard, elCell, i, j);

function startTimer() {
  gTimerInterval = timer();
}

function stopTimer() {
  clearInterval(gTimerInterval);
  gTimerInterval = null;
}

function onKeyUp(e) {
  // console.log(e);
}
