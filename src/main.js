const THREE = require('three')

window.THREE = THREE
// Adds orbitcontrols to global Threes object
require('three/examples/js/controls/MapControls')
const uniqid = require('uniqid')
const { initLoop } = require('./loop')
const { createScene } = require('./MapScene')

global.gameObjects = {}
global.instantiate = function instantiate(ClassTemplate, args) {
  const id = uniqid()
  const instance = new ClassTemplate(Object.assign({ id }, args))
  gameObjects[id] = instance
  return instance
}
global.destroy = function destroy(instance) {
  delete gameObjects[instance.id]
}

function initScene() {
  window.scene = new THREE.Scene()
  createScene()
}

initScene()
initLoop()
