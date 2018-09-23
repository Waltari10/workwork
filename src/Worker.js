const GameObject = require('./GameObject')
const _ = require('lodash')

module.exports = class Worker extends GameObject {
  constructor(args) {
    super(args)

    const material = new THREE.MeshNormalMaterial()
    const geometry = new THREE.SphereGeometry(0.05, 4, 4)
    this.mesh = new THREE.Mesh(geometry, material)

    scene.add(this.mesh)

  }
  update() {

  }
  render() {

  }
}