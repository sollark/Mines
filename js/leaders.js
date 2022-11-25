'use strict';

let gLeaders = [];

let gPlayer = {
  name: 'Player',
  time: 0,
};

function initLeaderList() {
  loadLeaders();
  // clearLeaderRecords();
  renderLeaders(gLeaders);
}

function loadLeaders() {
  const leadersFromStorage = loadFromLS('leaders');

  if (leadersFromStorage) {
    gLeaders = leadersFromStorage;
    renderLeaders(gLeaders);
  }
}

function checkIfLeader(time) {
  const gameTime = time;

  // if player has better time than last in gLeaders
  if (
    !gLeaders.length ||
    gLeaders.length < 10 ||
    gDurationTime < gLeaders.at(-1).time
  ) {
    // create leader object
    let playerName = '';
    while (true) {
      playerName = prompt('What is your name?');
      if (playerName.length > 15) alert('Too long');
      else break;
    }

    gPlayer.name = playerName;
    gPlayer.time = gameTime;

    // if gLeaders reach 10 records
    if (gLeaders.length === 10) gLeaders.pop();

    //save
    saveToLeaders(gPlayer);
  }

  renderLeaders(gLeaders);
}

function renderLeaders(leaders) {
  const elLeaderList = document.querySelector('.leaders');
  let strHTML = '';

  for (let leader of leaders) {
    strHTML +=
      `<li>
        <span class='name'>${leader.name} </span>
        <span class='time'> 
        time: ` +
      ('' + leader.time).toMMSS() +
      `</span>
      </li>`;
  }

  elLeaderList.innerHTML = strHTML;
}

function saveToLeaders(player) {
  gLeaders.push(player);

  // sort leaders by game time
  gLeaders.sort((leader1, leader2) => {
    return leader1.time - leader2.time;
  });

  saveToLS('leaders', gLeaders);
}

function clearLeaderRecords() {
  localStorage.removeItem('leaders');
}

{
  /* <ul class='leaders'></ul>; */
}
