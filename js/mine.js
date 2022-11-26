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

function boomSound() {
  var audio = new Audio('assets/sound/explosion.mp3');
  audio.volume = 0.17;
  audio.play();
}

function metalSound() {
  var audio = new Audio('assets/sound/click.mp3');
  audio.volume = 0.5;
  audio.playbackRate = 2;
  audio.play();
}
