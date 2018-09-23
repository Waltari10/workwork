const GameObject = require('../core/GameObject')
const { TREE } = require('../constants/tags')

module.exports = class Tree extends GameObject {
  constructor(args) {
    super(args)

    this.quantity = 10

    this.createMesh()
    this.tags = [TREE]
  }

  harvest() {
    if (this.quantity === 1) {
      scene.remove(this.mesh)
      this.isEmpty = true
      // destroy itself
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
    cone.position.z = 0.48
    scene.add(cone)
    this.mesh = cone


    const cylinderGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8)
    const cylinder = new THREE.Mesh(cylinderGeometry, trunk)
    cylinder.position.z = 0.015
    scene.add(cylinder)

    cylinder.rotation.x = Math.PI * 0.5
  }
}
