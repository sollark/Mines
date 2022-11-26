'use strict';

let gTimerInterval = null;
let gStartTime = 0;
let gDurationTime = 0;

function timer() {
  var elTimer = document.querySelector('.timer span');

  gStartTime = Date.now();

  const interval = setInterval(function () {
    var diff = Date.now() - gStartTime;
    elTimer.innerText = ('' + diff).toMMSS();
  }, 100);

  return interval;
}

function clearTimer() {
  gStartTime = 0;
  gDurationTime = 0;

  var elTimer = document.querySelector('.timer span');
  elTimer.innerText = '00:00';
}

function getGameTime() {
  return Date.now() - gStartTime;
}

function startTimer() {
  clearTimer();
  gTimerInterval = timer();
}

function stopTimer() {
  clearInterval(gTimerInterval);
  gTimerInterval = null;

  gDurationTime = getGameTime();

  return gDurationTime;
}

String.prototype.toMMSS = function () {
  const dateValue = parseInt(this, 10); // don't forget the second param
  const date = new Date(dateValue);

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
};
