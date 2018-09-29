const GameObject = require('../core/GameObject')
const { TREE } = require('../constants/tags')
const _ = require('lodash')

module.exports = class Tree extends GameObject {
  constructor(args) {
    super(args)
    this.createMesh()


    this.tags = [TREE]
    this.isFrozen = true

    this.quantity = this.scale * 10
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
    const maxScale = 1.7
    const minScale = 0.5

    const pivot = new THREE.Object3D()
    pivot.position.x = this.position.x
    pivot.position.y = this.position.y
    pivot.position.z = this.position.z
    const pineMaterial = new THREE.MeshStandardMaterial({
      color: '#2d9e44',
      roughness: 1,
      metallness: 0,
    })

    const coneGeometry = new THREE.ConeGeometry(0.3, 0.9, 32)
    const cone = new THREE.Mesh(coneGeometry, pineMaterial)
    cone.flatShading = false
    cone.castShadow = true // default is false
    cone.rotation.x = Math.PI * 0.5
    cone.position.z = 0.48
    pivot.add(cone)


    const trunkMaterial = new THREE.MeshStandardMaterial({
      color: '#1e4726',
      roughness: 1,
      metallness: 0,
    })

    const trunkGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8)
    const trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunkMesh.position.z = 0.015
    trunkMesh.rotation.x = Math.PI * 0.5
    trunkMesh.castShadow = true // default is false
    pivot.add(trunkMesh)


    const scale = _.random(minScale, maxScale, true)
    this.scale.x = scale
    this.scale.y = scale
    this.scale.z = scale
    pivot.scale.x = scale
    pivot.scale.y = scale
    pivot.scale.z = scale * _.random(0.8, 1.2, true)
    pivot.rotation.x += _.random(-Math.PI / 18, Math.PI / 18, true)
    pivot.rotation.y += _.random(-Math.PI / 18, Math.PI / 18, true)
    pivot.rotation.z = _.random(Math.PI * 2, true)
    scene.add(pivot)

    this.mesh = pivot
  }
}
