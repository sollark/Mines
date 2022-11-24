'use strict';

const gLevel = { SIZE: 4, MINES: 2 };
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 };
let gBoard = null;

function initGame() {
  // finish previous game
  gGame.isOn && gameIsOver();

  gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE, gLevel.MINES);
  renderBoard(gBoard);

  initSettings();

  gGame.isOn = true;
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

function gameIsOver(isWin = false) {
  isWin ? updateEmoji(EMOJI_COOL) : updateEmoji(EMOJI_SAD);

  gGame.isOn = false;
  stopTimer();
}

function initSettings() {
  updateEmoji(EMOJI_SMILE);
  gLives = 3;
  gHints = 3;
  gHintActivated = false;
  initMineCounter();
}
