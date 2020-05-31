import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';
import { getDataSelector } from '@core/utils';
import { matrix } from '../../core/utils';

const INITIAL_CELL_SELECTOR = '[data-id="1:A"]'
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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
    this.selection.select($cell)
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
}

