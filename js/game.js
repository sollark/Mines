'use strict';

const EASY = 4;
const MEDIUM = 8;
const EXPERT = 12;

const gLevel = { SIZE: EASY, MINES: 2 };
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 };
let gBoard = null;

function initGame() {
  // finish previous game
  gGame.isOn && confirm('Do you want start a new game?') && gameIsOver();

  gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE, gLevel.MINES);
  renderBoard(gBoard);

  initSettings();
  initLeaderList();
}

function onStartGameClick() {
  initGame();
}

function onLevelClick(level) {
  switch (level) {
    case 'Beginner':
      gLevel.SIZE = EASY;
      gLevel.MINES = 2;
      break;
    case 'Medium':
      gLevel.SIZE = MEDIUM;
      gLevel.MINES = 14;
      break;
    case 'Expert':
      gLevel.SIZE = EXPERT;
      gLevel.MINES = 32;
      break;
  }

  initGame();
}

function checkGameOver() {
  for (var i = 0; i < gLevel.SIZE; i++) {
    for (var j = 0; j < gLevel.SIZE; j++) {
      const cell = gBoard[i][j];
      if (cell.isMine && !cell.isMarked && !cell.isShown) return false;
      if (!cell.isMine && !cell.isShown) return false;
    }
  }
  return true;
}

function gameIsOver(isWin) {
  stopTimer();
  isWin ? updateEmoji(EMOJI_COOL) : updateEmoji(EMOJI_SAD);
  isWin && checkIfLeader();

  gGame.isOn = false;
}

function initSettings() {
  updateEmoji(EMOJI_SMILE);
  removeCrossImgs();
  gLives = 3;
  gHints = 3;
  gHintActivated = false;
  clearTimer();
  initMineCounter();
}
