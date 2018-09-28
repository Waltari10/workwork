
const GameObject = require('../core/GameObject')
require('three/examples/js/controls/MapControls')

module.exports = class Sun extends GameObject {
  constructor(args) {
    super(args)

    global.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.0000001,
    )

    const controls = new THREE.MapControls(camera)
    camera.position.set(0, 0, 15)
    controls.update()
  }
}
