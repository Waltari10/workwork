const GameObject = require('../core/GameObject')

module.exports = class Sun extends GameObject {
  constructor(args) {
    super(args)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    scene.add(directionalLight)
  }
}
