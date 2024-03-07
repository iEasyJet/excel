/* eslint-disable indent */
const CODES = {
  A: 65,
  Z: 90,
};

function createCell(row) {
  return function newRow(_, col) {
    return `
      <div 
        class='cell' 
        contenteditable
        data-type='cell' 
        data-col='${col}' 
        data-id='${row}:${col}'
      ></div>
    `;
  };
}

function toColumn(col, index) {
  return `
  <div class='column' data-type='resizeble' data-col='${index}'>
    ${col}
    <div class='col-resize' data-resize='col'></div>
  </div>
  `;
}

function createRow(index, content) {
  const resize = index
    ? `<div class='row-resize' data-resize='row'></div>`
    : '';
  return `
    <div class='row' data-type='resizeble'>
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');
  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount).fill('').map(createCell(row)).join('');
    rows.push(createRow(row + 1, cell));
  }

  return rows.join('');
}
