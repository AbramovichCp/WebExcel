export function capitalize(str) {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function getDataSelector(id) {
  return `[data-id="${id}"]`
}

export function matrix(target, current) {
  const cols = range(current.col, target.col)
  const rows = range(+current.row, +target.row)
  const ids = cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
  return ids
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  if (typeof start === 'string' && typeof end === 'string') {
    const startIndex = start.charCodeAt(0)
    const endIndex = end.charCodeAt(0)
    return new Array(endIndex - startIndex + 1).fill('').map((_, index) => {
      return String.fromCharCode(startIndex + index)
    })
  } else {
    return new Array(end - start + 1).fill('').map((_, index) => {
      return start + index
    })
  }
}

