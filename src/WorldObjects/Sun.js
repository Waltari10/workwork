const GameObject = require('../core/GameObject')

module.exports = class Sun extends GameObject {
  constructor(args) {
    super(args)

    const light = new THREE.DirectionalLight(
      'white',
      1,

    )
    light.castShadow = true
    light.position.set(100, 100, 100)
    scene.add(light)


    light.shadow.mapSize.width = 512 // default
    light.shadow.mapSize.height = 512 // default
    light.shadow.camera.near = 0.5 // default
    light.shadow.camera.far = 500 // default
  }
}
