'use strict';

const MINE_IMG = '<img src="assets/images/mine.png">';
const FLAG_IMG = '<img src="assets/images/flag.png">';
const EXPLOSION_IMG = '<img class="big" src="assets/images/explosion.gif">';

function createCell() {
  return {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false,
  };
}

function cellClicked(elCell, i, j) {
  // console.log('elCell:', elCell, 'i', i, 'j', j);
  // console.log('e', event);

  // if game is off, ignore all clicks
  if (!gGame.isOn) return;

  // start timer on first click and place mines
  if (!gTimerInterval) {
    startTimer();
    placeMines();
    setMinesNegsCount(gBoard);
  }

  const cell = gBoard[i][j];

  // if cel is open, ignore all clicks. recursion stopper
  if (cell.isShown) return;

  const loc = { i, j };

  // RMB
  if (event.button === 2) {
    cell.isMarked = !cell.isMarked;
    cell.isMarked ? decreaseMineCounter() : decreaseMineCounter();
    const value = cell.isMarked ? FLAG_IMG : '';

    renderCell(loc, value);
  }
  // LMB but cell is marked, do nothing
  else if (cell.isMarked) return;
  // LMB
  else {
    // update DOM and MODEL
    cell.isShown = true;
    elCell.classList.add('open');

    // there is a mine, finish game

    if (cell.isMine) {
      if (gLives) {
        removeLife();

        updateEmoji(EMOJI_SWEATY);

        // mine is defective
        renderMine(loc);
      } else {
        stepOnMine(loc);
        gameIsOver();
        return;
      }
    }
    // mines are close to the cell
    if (cell.minesAroundCount > 0) {
      renderMineAroundCount(loc);
    }
    // mines are far away
    else if (!cell.isMine) {
      stepOnSafeZone(loc);
    }
  }

  // apply hint
  if (gHintActivated) showNeighborsForSec(loc);

  const isWin = checkGameOver();
  isWin && gameIsOver(isWin);
}

function stepOnMine(loc) {
  //recover all mines
  recoverCellsWithMine();

  //explode image
  addToRenderCell(loc, EXPLOSION_IMG);
}

// cell with 0 mines around
function stepOnSafeZone(loc) {
  const neighbors = getNeighborsAround(gBoard, { i: loc.i, j: loc.j });
  neighbors.forEach((loc) => cellClicked(getElByLocation(loc), loc.i, loc.j));
  neighbors.forEach((loc) => setClassTo(loc, 'open'));
}

function recoverCellsWithMine() {
  for (let i = 0; i < gLevel.SIZE; i++)
    for (let j = 0; j < gLevel.SIZE; j++) {
      const currCell = gBoard[i][j];
      if (currCell.isMine) {
        renderCell({ i, j }, MINE_IMG);
        setClassTo({ i, j }, 'open');
        currCell.isShown = true;
      }
    }
}

function setMinesNegsCount(board) {
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].isMine) continue;

      // const numMinesAround = getNeighborsAround(board, { i, j }).length;
      const neighbors = getNeighborsAround(board, { i, j });
      const neighborsWithMine = neighbors.filter(
        (neighbor) => gBoard[neighbor.i][neighbor.j].isMine
      );

      // console.log(
      //   'i',
      //   i,
      //   'j',
      //   j,
      //   'neighbors:',
      //   neighbors,
      //   'neighborsWithMine',
      //   neighborsWithMine,
      //   gBoard
      // );
      const mineCount = neighborsWithMine.length;

      // console.log('neighbors:', neighbors, 'mineCount', mineCount);
      board[i][j].minesAroundCount = mineCount;
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
}

function renderMine(loc) {
  addToRenderCell(loc, MINE_IMG);
}

function renderMineAroundCount(loc) {
  const mineAmount = gBoard[loc.i][loc.j].minesAroundCount;
  renderCell(loc, mineAmount);
}

function renderHidden(loc) {
  renderCell(loc, '');
}
