const CODES = {
  A: 65,
  Z: 90,
}

const createRow = (content, index = '') => {
  return (`
    <div class="row">
      <div class="row-info">${index}</div>
      <div class="row-data">${content}</div>
    </div>
 `)
}

const toColumn = (col) => {
  return (`
    <div class="column">${col}</div>
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
  // eslint-disable-next-line no-debugger
  debugger
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
