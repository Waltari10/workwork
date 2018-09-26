const GameObject = require('../core/GameObject')
const { TREE } = require('../constants/tags')

module.exports = class Tree extends GameObject {
  constructor(args) {
    super(args)

    this.quantity = 10

    this.createMesh()
    this.tags = [TREE]
    this.isFrozen = true
  }

  harvest() {
    if (this.quantity === 1) {
      scene.remove(this.mesh)
      this.isEmpty = true
    } else {
      this.quantity -= 1
    }
  }

  createMesh() {
    const pine = new THREE.MeshBasicMaterial({ color: '#2d9e44' })
    const trunk = new THREE.MeshBasicMaterial({ color: '#1e4726' })

    const coneGeometry = new THREE.ConeGeometry(0.3, 0.9, 16)
    const cone = new THREE.Mesh(coneGeometry, pine)
    cone.rotation.x = Math.PI * 0.5
    cone.position.z = 0.48 + this.position.z
    cone.position.x = this.position.x
    cone.position.y = this.position.y
    scene.add(cone)
    this.mesh = cone


    const cylinderGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8)
    const cylinder = new THREE.Mesh(cylinderGeometry, trunk)
    cylinder.position.x = this.position.x
    cylinder.position.y = this.position.y
    cylinder.position.z = 0.015 + this.position.z
    scene.add(cylinder)

    cylinder.rotation.x = Math.PI * 0.5
  }
}
