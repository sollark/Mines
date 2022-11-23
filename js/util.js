'use strict';

// MODEL MATRIX
function buildBoard(rows, cols, mines) {
  const mat = [];
  for (var i = 0; i < rows; i++) {
    const row = [];
    for (var j = 0; j < cols; j++) {
      row.push(createCell());
    }
    mat.push(row);
  }

  // mines
  // mat[0][0].isMine = true;
  // mat[0][1].isMine = true;

  return mat;
}

// DOM MATRIX
function renderBoard(board) {
  const elBoard = document.querySelector('.board');

  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n';

    for (var j = 0; j < board[0].length; j++) {
      const currCell = board[i][j];

      let cellClass = `cell cell-${i}-${j}`;
      // console.log('cellClass:', cellClass);

      // if (currCell.isMine) cellClass += ' mine';
      // if (currCell.isShown) cellClass += ' open';
      // else if (currCell.type === WALL) cellClass += ' wall';

      strHTML += `\t<td class="cell ${cellClass}"  onclick="cellClicked(this,${i},${j})" >\n`;
      // console.log('currCell.minesAroundCount :', currCell.minesAroundCount);
      if (!currCell.isShown) {
        // strHTML += BALL_IMG;
      } else if (currCell.isMine) {
        strHTML += MINE_IMG;
      } else if (currCell.minesAroundCount > 0)
        strHTML += currCell.minesAroundCount;

      strHTML += '\t</td>\n';
    }
    strHTML += '</tr>\n';
  }

  elBoard.innerHTML = strHTML;
}

// ??
function setClassToAll(board, className) {
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board.length; j++) {
      const cellSelector = '.' + getLocationClassName({ i, j }); // cell-i-j
      const elCell = document.querySelector(cellSelector);
      console.log('elCell', elCell);
    }
}

// Gets coordinates {i, j } and returns a coordinates class name
function getLocationClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

// Convert a coordinate {i, j} to a selector and render a DOM value in that element
function renderCell(location, value) {
  const cellSelector = '.' + getLocationClassName(location); // cell-i-j
  console.log('cellSelector:', cellSelector);
  const elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

// Finds a values in MODEL and returns array with coordinates {i,j}
function getCellsWith(mat, value) {
  const cells = [];

  for (let i = 1; i < mat.length - 1; i++)
    for (let j = 1; j < mat[i].length - 1; j++) {
      if (mat[i][j] === value) cells.push({ i, j });
    }
  return cells;
}

// Find neighbors
function getNeighborsAround(mat, pos) {
  var neighbors = [];
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === pos.i && j === pos.j) continue;
      if (mat[i][j].isMine) neighbors.push({ i: i, j: j });
    }
  }
  return neighbors;
}

// Returns random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Returns array with numbers
function initNumPool(size) {
  const nums = [];

  for (var i = 1; i <= size; i++) {
    nums.push(i);
  }

  return shuffle(nums);
}

// Shuffle items in array
function shuffle(arr) {
  let currentIndex = arr.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}

// Deep copy of array
function copyArray(array) {
  return JSON.parse(JSON.stringify(array));
}

// Random color string
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function timer() {
  var timer = document.querySelector('.timer span');

  var start = Date.now();

  gTimerInterval = setInterval(function () {
    var currTs = Date.now();

    var secs = parseInt((currTs - start) / 1000);

    var ms = currTs - start - secs * 1000;

    ms = '000' + ms;

    ms = ms.substring(ms.length - 2, ms.length);

    timer.innerText = `\n ${secs}:${ms}`;
  }, 100);
}

const c = console.log(document);
