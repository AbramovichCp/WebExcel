import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';
import {
  getDataSelector,
  matrix,
} from '@core/utils';

const INITIAL_CELL_SELECTOR = '[data-id="1:A"]'
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'click'],
      ...options,
    })
  }

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find(INITIAL_CELL_SELECTOR)
    this.selectCell($cell)

    this.$on('forma:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('forma:enterPress', (event) => {
      this.selection.current.focus()
    })
  }

  onClick(event) {
    this.$dispatch('table:click', $(event.target))
  }

  onInput(event) {
    this.$dispatch('table:input', $(event.target))
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$dispatch('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const $cells = matrix(target, current).map((id) => {
          return this.$root.find(getDataSelector(id))
        })
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft',
      'ArrowRight',
    ]

    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  destroy() {
    super.destroy()
  }
}

