'use strict';

const MINE = '*';
const EXPLOSION = '@';
const FLAG = '#';

const MINE_IMG = '<img src="../assets/images/mine.png">';
// const FLAG_IMG = '<img src=".png">';
// const EXPLOSION_IMG = '<img src=".png">';

const gLevel = { SIZE: 4, MINES: 2 };
const gGame = { isOn: false, shownCount: 0, secsPassed: 0 };
let gBoard = null;

function initGame() {
  console.log('onInit()');

  // initGameSettings();
  gBoard = buildBoard(gLevel.SIZE, gLevel.SIZE, gLevel.MINES);
  placeMines();
  setMinesNegsCount(gBoard);
  renderBoard(gBoard);

  console.table(gBoard);
}

function setMinesNegsCount(board) {
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].isMine) continue;

      const numMinesAround = getNeighborsAround(board, { i, j }).length;
      board[i][j].minesAroundCount = numMinesAround;

      // renderCell({ i, j }, '' + numMinesAround);

      // const cellSelector = '.' + getLocationClassName({ i, j }); // cell-i-j
      // const elCell = document.querySelector(cellSelector);
      // console.log('elCell', elCell);
    }
}

function placeMines() {
  let counter = gLevel.MINES;

  while (counter--) {
    const randomLocation = {
      i: getRandomInt(0, gLevel.SIZE - 1),
      j: getRandomInt(0, gLevel.SIZE - 1),
    };
    if (gBoard[randomLocation.i][randomLocation.j].isMine) counter++;
    gBoard[randomLocation.i][randomLocation.j].isMine = true;
  }
  console.log(gBoard);
}

function cellClicked(elCell, i, j) {
  console.log('elCell:', elCell, 'i', i, 'j', j);
  if (gBoard[i][j].isMine) {
    gBoard[i][j].isShown = true;
    renderCell({ i, j }, MINE_IMG);
    console.log('boom');
  } else if (gBoard[i][j].minesAroundCount > 0) {
    gBoard[i][j].isShown = true;
    renderCell({ i, j }, gBoard[i][j].minesAroundCount);
    console.log('lucky');
  } else {
    console.log('safe');
  }
}

// function cellMarked(elCell);

// function stepOnMine(){}

// function stepOnSafeZone(){}

// function stepOnDangerousZone(){}

function showAllCells(gBoard) {}

// function checkGameOver();

// function expandShow(gBoard, elCell, i, j);

function onKeyUp(e) {
  // console.log(e);
}
