const GameObject = require('../core/GameObject')

module.exports = class Sun extends GameObject {
  constructor(args) {
    super(args)

    const light = new THREE.DirectionalLight(
      'white',
      1,
    )

    // const shadowAreaLength = 20

    // light.castShadow = true
    // light.shadow.mapSize.width = 2048
    // light.shadow.mapSize.height = 2048
    // light.shadow.camera.near = 5.0
    // light.shadow.camera.far = shadowAreaLength
    // light.shadow.bias = -0.005
    // light.shadow.radius = 1
    // light.shadow.camera.left = -shadowAreaLength
    // light.shadow.camera.bottom = -shadowAreaLength
    // light.shadow.camera.right = shadowAreaLength
    // light.shadow.camera.top = shadowAreaLength

    light.shadow.mapSize.width = 4096 // default is 512
    light.shadow.mapSize.height = 4096// default is 512
    light.shadow.camera.near = 0.5 // default
    light.shadow.camera.far = 500 // default

    // console.log(light.shadow.camera)
    light.shadow.camera.top = 100
    light.shadow.camera.bottom = -100
    light.shadow.camera.left = -100
    light.shadow.camera.right = 100

    light.castShadow = true
    light.position.set(100, 100, 90)
    scene.add(light)

    light.shadowCameraVisible = true
  }
}
