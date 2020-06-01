import { increaseChar, decreaseChar, getDataSelector } from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function nextSelector(key, { row, col }) {
  const MIN_VALUE = 1
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col = increaseChar(col)
      break
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
      break
    case 'ArrowLeft':
      col = decreaseChar(col)
      break
  }
  const id = `${row}:${col}`
  return getDataSelector(id)
}

