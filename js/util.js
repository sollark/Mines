'use strict'

// MODEL MATRIX
function buildBoard(rows, cols, mines) {
  const mat = []
  for (var i = 0; i < rows; i++) {
    const row = []
    for (var j = 0; j < cols; j++) {
      row.push(createCell())
    }
    mat.push(row)
  }

  return mat
}

// DOM MATRIX
function renderBoard(board) {
  const elBoard = document.querySelector('.board')

  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>\n'

    for (var j = 0; j < board[0].length; j++) {
      let cellClass = `cell cell-${i}-${j}`
      strHTML += `\t<td class="cell ${cellClass}"  onclick="cellClicked(this,${i},${j})" >\n`
      strHTML += '\t</td>\n'
    }
    strHTML += '</tr>\n'
  }

  elBoard.innerHTML = strHTML
}

function getElByLocation(location) {
  const cellSelector = '.' + getLocationClassName(location) // cell-i-j
  return document.querySelector(cellSelector)
}

function setClassTo(location, value) {
  const cellSelector = '.' + getLocationClassName(location) // cell-i-j
  const elCell = document.querySelector(cellSelector)
  elCell.classList.add(value)
}

// Gets coordinates {i, j } and returns a class name for those coordinates
function getLocationClassName(location) {
  const cellClass = 'cell-' + location.i + '-' + location.j
  return cellClass
}

// Convert a coordinate {i, j} to a selector and render a DOM value in that element
function renderCell(location, value) {
  const cellSelector = '.' + getLocationClassName(location) // cell-i-j

  const elCell = document.querySelector(cellSelector)
  elCell.innerHTML = value
}

function addToCellValue(location, value) {
  const cellSelector = '.' + getLocationClassName(location) // cell-i-j
  const elCell = document.querySelector(cellSelector)
  elCell.innerHTML += value
}

// Find neighbors
function getNeighborsAround(mat, pos) {
  var neighbors = []
  for (var i = pos.i - 1; i <= pos.i + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = pos.j - 1; j <= pos.j + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue
      if (i === pos.i && j === pos.j) continue
      neighbors.push({ i: i, j: j })
    }
  }
  return neighbors
}

// Returns random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Enable event on right mouse click
window.oncontextmenu = (e) => {
  e.preventDefault()

  e.target.onclick
    ? e.target.onclick()
    : e.originalTarget.offsetParent.onclick()
}
