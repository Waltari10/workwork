const GameObject = require('./GameObject')

module.exports = class Building extends GameObject {
  constructor({ resources, timeToConstruct } = {}) {
    super()
    this.resources = resources
    this.timeToConstruct = timeToConstruct
  }

  // update() {}
}
