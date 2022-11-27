'use strict';

const MINE_IMG = '<img src="assets/images/mine.png">';
const FLAG_IMG = '<img class="medium z-index5" src="assets/images/flag.png">';
const EXPLOSION_IMG =
  '<img class="big z-index10" src="assets/images/explosion.gif">';

function createCell() {
  return {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false,
  };
}

function cellClicked(elCell, i, j) {
  // first click, start game
  if (!gGame.isOn && isFirstClick()) gGame.isOn = true;

  // if game is off, ignore all clicks
  if (!gGame.isOn) return;

  // start timer on first click and place mines
  if (!gTimerInterval) {
    startTimer();

    // MODEL
    placeMines({ i, j });
    setMinesNegsCount(gBoard);
  }

  const currCell = gBoard[i][j];
  const loc = { i, j };

  // if cel is open, ignore click.
  if (currCell.isShown) return;

  // RMB (flag marker)
  if (event.button === 2) {
    currCell.isMarked = !currCell.isMarked;
    currCell.isMarked ? decreaseMineCounter() : increaseMineCounter();
    const cellValue = currCell.isMarked ? FLAG_IMG : '';

    renderCell(loc, cellValue);
  }
  // LMB but cell is marked, do nothing
  else if (currCell.isMarked) return;
  // hint is activated
  else if (gHintActivated) {
    showNeighborsForSec(loc);
    return;
  }
  // LMB
  else {
    // update DOM and MODEL
    currCell.isShown = true;
    elCell.classList.add('open');

    if (currCell.isMine) {
      decreaseMineCounter();
      removeLife();
      renderMine(loc);

      // mine is defective
      if (gLives) {
        touchingMine();
      }
      // explosion
      else {
        stepOnMine(loc);
        gameIsOver(false);
        return;
      }
    }
    // if there are mine around
    if (currCell.minesAroundCount > 0) {
      renderMineAroundCount(loc);
    }

    // mines are far away
    else if (!currCell.isMine) {
      currCell.isShown = false;
      expendShow(gBoard, elCell, loc);
    }
  }

  const isWin = checkGameOver();
  isWin && gameIsOver(isWin);
}

function stepOnMine(loc) {
  //recover all mines
  recoverCellsWithMine();

  //explode image
  addToCellValue(loc, EXPLOSION_IMG);
  boomSound();
}

function touchingMine() {
  metalSound();
}

function expendShow(board, elCell, loc) {
  const currCell = board[loc.i][loc.j];
  if (currCell.minesAroundCount > 0 || currCell.isShown) return;

  currCell.isShown = true;
  elCell.classList.add('open');

  const neighbors = getNeighborsAround(board, { i: loc.i, j: loc.j });
  neighbors.forEach((neighbor) => {
    const neighborCell = board[neighbor.i][neighbor.j];
    const elNeighbor = getElByLocation(neighbor);

    if (neighborCell.minesAroundCount > 0) {
      neighborCell.isShown = true;
      elNeighbor.classList.add('open');
      renderMineAroundCount(neighbor);
    } else {
      expendShow(board, elNeighbor, neighbor);
    }
  });
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

      const neighborsLoc = getNeighborsAround(board, { i, j });
      const neighborsWithMineLoc = neighborsLoc.filter(
        (neighbor) => gBoard[neighbor.i][neighbor.j].isMine
      );

      board[i][j].minesAroundCount = neighborsWithMineLoc.length;
    }
}

function placeMines(playerLoc) {
  let counter = gLevel.MINES;

  while (counter--) {
    const randomLocation = {
      i: getRandomInt(0, gLevel.SIZE - 1),
      j: getRandomInt(0, gLevel.SIZE - 1),
    };
    if (
      gBoard[randomLocation.i][randomLocation.j].isMine ||
      JSON.stringify(playerLoc) === JSON.stringify(randomLocation)
    )
      counter++;
    else gBoard[randomLocation.i][randomLocation.j].isMine = true;
  }
}

function renderMine(loc) {
  addToCellValue(loc, MINE_IMG);
}

function renderMineAroundCount(loc) {
  const mineAmount = gBoard[loc.i][loc.j].minesAroundCount;
  renderCell(loc, mineAmount);
}

function renderHidden(loc) {
  gBoard[loc.i][loc.j].isMarked
    ? renderCell(loc, FLAG_IMG)
    : renderCell(loc, '');
}

function isFirstClick() {
  for (let i = 0; i < gLevel.SIZE; i++)
    for (let j = 0; j < gLevel.SIZE; j++) {
      const currCell = gBoard[i][j];
      if (currCell.isShown) return false;
    }

  return true;
}
