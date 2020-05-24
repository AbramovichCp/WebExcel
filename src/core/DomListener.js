import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DOM listener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getEventName(listener)
      if (!this[method]) {
        throw new Error(
            `method ${method} is not implemented in ${this.name} Component`
        )
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getEventName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

const getEventName = (eventName) => {
  return `on${capitalize(eventName)}`
}
