const CODES = {
  A: 65,
  Z: 90,
}

const createRow = (content, index = '') => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return (`
    <div class="row">
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
 `)
}

const toColumn = (col) => {
  return (`
    <div class="column" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
 `)
}

const toCell = () => {
  return (`
    <div class="cell" contenteditable></div>
 `)
}

const arrayOfChar = () => {
  const arr = [];
  for (let i = CODES.A; i <= CODES.Z; i++) {
    arr.push(String.fromCharCode(i))
  }
  return arr
}

export function createTable(rowsCount = 15) {
  const columnCount = CODES.Z - CODES.A
  const rows = []

  const columns = arrayOfChar().map(el => toColumn(el)).join('')
  rows.push(createRow(columns))

  for (let i = 0; i <= columnCount; i++) {
    const cells = new Array(columnCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
