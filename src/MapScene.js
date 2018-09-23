// const _ = require('lodash')

const Worker = require('./Worker.js')
const Ground = require('./Ground.js')

function createScene() {
  global.camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
  )

  const controls = new THREE.MapControls(camera)
  camera.position.set(0, 0, 20)
  controls.update()

  instantiate(Worker)
  instantiate(Ground)
}

module.exports = {
  createScene,
}
