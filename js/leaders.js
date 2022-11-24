'use strict';

let gLeaders = [{ name: 'Andrey', time: 20000 }];

let gPlayer = {
  name: 'Moshe',
  time: '',
};

// load leaders from a storage
const leadersFromStorage = JSON.parse(localStorage.getItem('leaders'));

function initLeaderList() {
  loadLeaders();
  renderLeaders(gLeaders);
}

function checkForLeader() {
  setTimer();
  gPlayer.time = gTimer;

  // TODO compare with leader list

  const playerName = prompt('What is your name?');
  gPlayer.name = playerName;

  if (gLeaders.length === 10) gLeaders.pop();
  saveToLeaders(gPlayer);
  renderLeaders(gLeaders);
}

function loadLeaders() {
  if (leadersFromStorage) {
    gLeaders = leadersFromStorage;
    renderLeaders(gLeaders);
  }
}

function renderLeaders(leaders) {
  const elLeaderList = document.querySelector('.leaders');
  let strHTML = '';

  for (let leader of leaders) {
    strHTML += `<li>
            ${leader.name}  time: ${new Date(leader.time).getSeconds()}
      </li>`;
  }

  elLeaderList.innerHTML = strHTML;
}

function saveToLeaders(player) {
  gLeaders.push(player);

  localStorage.setItem('leaders', JSON.stringify(gLeaders));
}
