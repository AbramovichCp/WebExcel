export const CODES = {
  A: 65,
  Z: 90,
}

const createRow = (content, index = '') => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return (`
    <div class="row" data-type="resizable">
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
    <div class="column" data-type="resizable" data-col=${col}>
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
 `)
}

const toCell = (colIndex, rowIndex) => {
  return (`
    <div
      class="cell"
      data-type="cell"
      data-col=${colIndex}
      data-row=${rowIndex}
      data-id=${rowIndex}:${colIndex}
      contenteditable>
    </div>
 `)
}

const arrayOfChar = () => {
  const arr = [];
  for (let i = CODES.A; i <= CODES.Z; i++) {
    arr.push(String.fromCharCode(i))
  }
  return arr
}

export function createTable() {
  const rows = []
  const rowsCount = arrayOfChar().length

  const columns = arrayOfChar().map(toColumn).join('')
  rows.push(createRow(columns))

  for (let row = 0; row <= rowsCount; row++) {
    const cells = arrayOfChar()
        .map((colIndex) => toCell(colIndex, row + 1))
        .join('')
    rows.push(createRow(cells, row + 1))
  }

  return rows.join('')
}
