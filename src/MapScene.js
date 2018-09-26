// const _ = require('lodash')

const Worker = require('./WorldObjects/Worker.js')
const Ground = require('./WorldObjects/Ground.js')
const Tree = require('./WorldObjects/Tree.js')
const House = require('./WorldObjects/House.js')

function createScene() {
  global.camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.0000001,
  )


  const controls = new THREE.MapControls(camera)
  camera.position.set(0, 0, 2)
  controls.update()

  instantiate(Worker, {
    position: Vector3(2, 0, 0),
  })

  instantiate(Ground)

  instantiate(Tree, {
    position: Vector3(0, 0, 0),
  })
  instantiate(House, {
    position: Vector3(2, 2, 0.01),
  })
}

module.exports = {
  createScene,
}
