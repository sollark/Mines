'use strict';

const CROSS_IMG = '<img class="small" src="../assets/images/cross.jpeg">';

let gLives = 3;
let gHints = 3;
let gHintActivated = false;

function removeLife() {
  const elSapper = document.querySelector(`.lives span:nth-of-type(${gLives})`);

  elSapper.innerHTML += CROSS_IMG;
  gLives--;
}

function removeHint() {
  const elDog = document.querySelector(`.hints span:nth-of-type(${gHints})`);

  elDog.innerHTML += CROSS_IMG;
  gHints--;
}

function onHintClick() {
  if (gHintActivated) return;

  gHintActivated = true;

  removeHint();
}

function showNeighborsForSec(loc) {
  gHintActivated = false;

  const neighbors = getNeighborsAround(gBoard, loc);

  neighbors.forEach((neighbor) => {
    showCellForSec(neighbor);
  });
}

function showCellForSec(loc) {
  const cell = gBoard[loc.i][loc.j];

  if (cell.isShown) return;

  cell.isMine ? renderMine(loc) : renderMineAroundCount(loc);

  setTimeout(() => {
    renderHidden(loc);
  }, 1000);
}
