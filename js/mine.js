'use strict';

let gMines = 0;

function initMineCounter() {
  const elDisplayCounter = document.querySelector('.mines span');
  gMines = gLevel.MINES;
  elDisplayCounter.innerHTML = gMines;
}

function increaseMineCounter() {
  const elDisplayCounter = document.querySelector('.mines span');
  elDisplayCounter.innerHTML = ++gMines;
}

function decreaseMineCounter() {
  const elDisplayCounter = document.querySelector('.mines span');
  elDisplayCounter.innerHTML = --gMines;
}
