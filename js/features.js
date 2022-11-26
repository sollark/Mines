'use strict';

const CROSS_IMG =
  '<img class="small z-index10 cross" src="assets/images/cross.png">';

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
  if (gHintActivated || !gGame.isOn) return;

  gHintActivated = true;

  removeHint();
}

function showNeighborsForSec(loc) {
  gHintActivated = false;

  const neighbors = getNeighborsAround(gBoard, loc);

  neighbors.forEach((neighbor) => {
    showCellForSec(neighbor);
  });

  showCellForSec(loc);
}

function showCellForSec(loc) {
  const cell = gBoard[loc.i][loc.j];

  if (cell.isShown) return;

  cell.isMine ? renderMine(loc) : renderMineAroundCount(loc);

  setTimeout(() => {
    renderHidden(loc);
  }, 1000);
}

function removeCrossImgs() {
  const crossImages = document.querySelectorAll('.cross');
  crossImages.forEach((cross) => cross.remove());
}
