// const _ = require('lodash')

const Worker = require('./WorldObjects/Worker.js')
const Ground = require('./WorldObjects/Ground.js')
const Tree = require('./WorldObjects/Tree.js')
const House = require('./WorldObjects/House.js')
const Sun = require('./WorldObjects/Sun.js')
const Camera = require('./WorldObjects/Camera.js')

function createScene() {
  instantiate(Camera)

  instantiate(Worker, {
    position: Vector3(2, 0, 0),
  })
  instantiate(Sun)

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
