
const raycaster = new THREE.Raycaster()

const { GROUND_NAME } = require('../constants/names')
const { MAX_GROUND_HEIGHT } = require('../constants/other')

const _ = require('lodash')

module.exports = class GameObject {
  constructor({
    position = Vector3(),
    tags = [],
    mesh,
    HP = 1,
    rotation,
    isGrounded = true,
    isFrozen = false,
    scale = Vector3(),
  } = {}) {
    this.rotation = rotation
    this.position = position
    this.tags = tags
    this.mesh = mesh
    this.HP = HP
    this.isGrounded = isGrounded
    this.isFrozen = isFrozen
    this.scale = scale
  }

  snapToGround() {
    let direction = new THREE.Vector3(0, 0, -1)
    const origin = new THREE.Vector3(this.position.x, this.position.y, MAX_GROUND_HEIGHT)
    direction = direction.normalize()
    raycaster.set(origin, direction)

    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0) {
      const groundIntersection = intersects.find(obj => {
        if (obj.object.name === GROUND_NAME) {
          return true
        }
        return false
      })
      this.position.z = groundIntersection.point.z
      if (this.mesh) {
        this.mesh.position.z = groundIntersection.point.z
      }
      return groundIntersection.point.z
    }
    return 0
  }

  update() {
    if (this.isGrounded && !this.isFrozen) {
      this.snapToGround()
    }
  }
}
