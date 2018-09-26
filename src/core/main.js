const THREE = require('three')

window.THREE = THREE
// Adds orbitcontrols to global Threes object
require('three/examples/js/controls/MapControls')
require('three/examples/js/geometries/ConvexGeometry')
require('three/examples/js/QuickHull')
const uniqid = require('uniqid')
const { initLoop } = require('./loop')
const { createScene } = require('../MapScene')

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

global.Vector3 = function Vector3(x, y, z) {
  return new THREE.Vector3(x, y, z)
}

global.findTag = function findTag(tag) {
  return Object.values(gameObjects).find(go => {
    if (go.tags && go.tags.includes(tag)) {
      return true
    }
    return false
  })
}

function initScene() {
  window.scene = new THREE.Scene()
  createScene()
}

initScene()
initLoop()
