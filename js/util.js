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

  return mat;
}

// DOM MATRIX
function renderBoard(board) {
  const elBoard = document.querySelector('.board');

  var strHTML = '';
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n';

    for (var j = 0; j < board[0].length; j++) {
      let cellClass = `cell cell-${i}-${j}`;

      strHTML += `\t<td class="cell ${cellClass}"  onclick="cellClicked(this,${i},${j})" >\n`;

      strHTML += '\t</td>\n';
    }
    strHTML += '</tr>\n';
  }

  elBoard.innerHTML = strHTML;
}

function getElByLocation(location) {
  const cellSelector = '.' + getLocationClassName(location); // cell-i-j
  return document.querySelector(cellSelector);
}

// ??
function setClassToAll(board, className) {
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board.length; j++) {
      const cellSelector = '.' + getLocationClassName({ i, j }); // cell-i-j
      const elCell = document.querySelector(cellSelector);
      // console.log('elCell', elCell);
    }
}

function setClassTo(location, value) {
  const cellSelector = '.' + getLocationClassName(location); // cell-i-j
  // console.log('cellSelector:', cellSelector);
  // console.log('value:', value);
  const elCell = document.querySelector(cellSelector);
  elCell.classList.add(value);
}

// Gets coordinates {i, j } and returns a coordinates class name
function getLocationClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}

// Convert a coordinate {i, j} to a selector and render a DOM value in that element
function renderCell(location, value) {
  const cellSelector = '.' + getLocationClassName(location); // cell-i-j
  // console.log('cellSelector:', cellSelector);
  // console.log('value:', value);
  const elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

function addToRenderCell(location, value) {
  const cellSelector = '.' + getLocationClassName(location); // cell-i-j
  // console.log('cellSelector:', cellSelector);
  // console.log('value:', value);
  const elCell = document.querySelector(cellSelector);
  elCell.innerHTML += value;
}

// Find neighbors
function getNeighborsAround(mat, pos) {
  var neighbors = [];
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === pos.i && j === pos.j) continue;
      neighbors.push({ i: i, j: j });
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

// enable event on right mouse click
window.oncontextmenu = (e) => {
  e.preventDefault();
  // console.log('e:', e);

  e.target.onclick
    ? e.target.onclick()
    : e.originalTarget.offsetParent.onclick();
};
