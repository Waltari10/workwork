// const _ = require('lodash')
const GameObject = require('./GameObject')

module.exports = class Ground extends GameObject {
  constructor(args) {
    super(args)

    const geometry = new THREE.PlaneGeometry(1000, 1000, 1000)
    const material = new THREE.MeshBasicMaterial({ color: 'brown', side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)
  }
}
