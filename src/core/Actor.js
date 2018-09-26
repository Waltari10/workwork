const _ = require('lodash')
const GameObject = require('./GameObject')
const {
  ATTACK,
  CHOP_WOOD,
} = require('../constants/actions')
const Worker = require('../WorldObjects/Worker')


module.exports = class Actor extends GameObject {
  constructor({
    reach = 0.65,
    inventory = {
      wood: 0,
    },
    speed = 0.01,
    destination,
    dmg = 1,
    faction,
    actionCooldownMS = 500,
    inventoryLimit = 10,
    ...args
  } = {}) {
    super(args)

    this.reach = reach
    this.inventory = inventory
    this.speed = speed
    this.destination = destination
    this.dmg = dmg
    this.faction = faction
    this.actionCooldownMS = actionCooldownMS
    this.lastActionMS = Date.now()
    this.inventoryLimit = inventoryLimit
  }

  move() {
    if (this.destination) {
      const workPos = this.mesh.position.clone()

      const diff = workPos.sub(this.destination)
      const clamped = diff.clampLength(0, this.speed)
      clamped.z = 0

      this.mesh.position.sub(clamped)

      this.position.x = this.mesh.position.x
      this.position.y = this.mesh.position.y

      if (this.mesh.position.distanceTo(this.destination) < this.reach) {
        delete this.destination
      }
    }

    this.mesh.position.z = this.position.z
  }

  chopWood() {
    if (_.isNil(this.tree) || this.tree.isEmpty) return
    this.tree.harvest()
    this.inventory.wood += 1
  }

  action(type) {
    if (this.lastActionMS + this.actionCooldownMS > Date.now()) return
    console.log(type)
    this.lastActionMS = Date.now()
    switch (type) {
      case CHOP_WOOD:
        this.chopWood()
        break
      case ATTACK:
        break

      default:
        break
    }
  }

  findJob() {}

  attack() {}
}
