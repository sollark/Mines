'use strict';

let gTimerInterval = null;
let gTimer = null;

function timer() {
  var timer = document.querySelector('.timer span');

  var start = Date.now();
  gTimer = start;

  const interval = setInterval(function () {
    var currTs = Date.now();

    var secs = parseInt((currTs - start) / 1000);

    var ms = currTs - start - secs * 1000;

    ms = '000' + ms;

    ms = ms.substring(ms.length - 2, ms.length);

    timer.innerText = `${secs}:${ms}`;
  }, 100);

  return interval;
}

function setTimer() {
  gTimer = Date.now() - gTimer;
}

function startTimer() {
  gTimer = null;
  gTimerInterval = timer();
}

function stopTimer() {
  clearInterval(gTimerInterval);
  gTimerInterval = null;
}
