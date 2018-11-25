
const GameObject = require('../core/GameObject')
require('three/examples/js/controls/MapControls')

module.exports = class Sun extends GameObject {
  constructor(args) {
    super(args)

    global.camera = new THREE.PerspectiveCamera(
      45, // fow
      1, // window.innerWidth / window.innerHeight,
      0.1,
      10000,
    )

    //  camera = new THREE.PerspectiveCamera(
    // 45,// Field of view
    // 1,// Aspect ratio
    // 0.1,// Near
    // 10000 // Far
    // );

    const controls = new THREE.MapControls(camera)
    camera.position.set(0, 0, 15)
    controls.update()
  }
}
