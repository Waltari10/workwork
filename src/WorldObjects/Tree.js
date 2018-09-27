const GameObject = require('../core/GameObject')
const { TREE } = require('../constants/tags')
const _ = require('lodash')

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
    const pivot = new THREE.Object3D()
    pivot.position.x = this.position.x
    pivot.position.y = this.position.y
    pivot.position.z = this.position.z
    const pine = new THREE.MeshBasicMaterial({ color: '#2d9e44' })
    const trunk = new THREE.MeshBasicMaterial({ color: '#1e4726' })

    const coneGeometry = new THREE.ConeGeometry(0.3, 0.9, 16)
    const cone = new THREE.Mesh(coneGeometry, pine)
    cone.rotation.x = Math.PI * 0.5
    cone.position.z = 0.48
    pivot.add(cone)


    const cylinderGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8)
    const cylinder = new THREE.Mesh(cylinderGeometry, trunk)
    cylinder.position.z = 0.015
    cylinder.rotation.x = Math.PI * 0.5
    pivot.add(cylinder)

    pivot.rotation.x += _.random(-Math.PI / 18, Math.PI / 18, true)
    pivot.rotation.y += _.random(-Math.PI / 18, Math.PI / 18, true)
    pivot.rotation.z = _.random(Math.PI * 2, true)
    scene.add(pivot)

    this.mesh = pivot
  }
}
