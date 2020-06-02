import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return (
      `<div class="info">fx</div>
      <div class="input" id="formula" contenteditable spellcheck="false"></div>`
    )
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:click', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onInput(event) {
    this.$dispatch('forma:input', $(event.target).text())
  }

  onClick(event) {
    console.log('Formula onClick:', event)
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$dispatch('forma:enterPress', event)
    }
  }
}
