import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubs = []
    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  $dispatch(event, ...args) {
    this.emitter.dispatch(event, ...args)
  }

  $on(event, func) {
    const unsub = this.emitter.subscribe(event, func)
    this.unsubs.push(unsub)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }
}
