/* eslint-disable indent */
const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function createCell(state, row) {
  return function newRow(_, col) {
    const width = getWidth(state.colState, col);
    const id = `${row}:${col}`;
    const data = state.dataState[id] || '';
    return `
      <div 
        class='cell' 
        contenteditable
        data-type='cell' 
        data-col='${col}' 
        data-id='${id}'
        style='width: ${width}'
      >${data}</div>
    `;
  };
}

function toColumn({ col, index, width }) {
  return `
  <div 
    class='column' 
    data-type='resizeble' 
    data-col='${index}' 
    style='width: ${width}'
  >
    ${col}
    <div class='col-resize' data-resize='col'></div>
  </div>
  `;
}

function createRow(index, content, state) {
  const resize = index
    ? `<div class='row-resize' data-resize='row'></div>`
    : '';

  const height = getHeight(state, index);

  return `
    <div 
      class='row' 
      data-type='resizeble' 
      data-row=${index} 
      style='height: ${height}'
    >
      <div class='row-info'>
        ${index ? index : ''}
        ${resize}
      </div>
      <div class='row-data'>${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  /* eslint-disable space-before-function-paren */
  return function (col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount)
      .fill('')
      .map(createCell(state, row))
      .join('');
    rows.push(createRow(row + 1, cell, state));
  }

  return rows.join('');
}
