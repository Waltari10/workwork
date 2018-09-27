const _ = require('lodash')
const perlin = require('perlin-noise')
const GameObject = require('../core/GameObject')
const Tree = require('../WorldObjects/Tree')

const raycaster = new THREE.Raycaster()

const { GROUND_NAME } = require('../constants/names')

module.exports = class Ground extends GameObject {
  constructor(args) {
    super(args)

    this.sizeX = 20
    this.sizeY = 20

    this.createGround()
    this.addTrees()
    this.addWater()
    this.isFrozen = true
  }

  addWater() {}

  addTrees() {
    const options = {
      octaveCount: 4, // 4 defaults
      amplitude: 0.1, // 0.1
      persistence: 0.2, // 0.2
    }

    const treesPerSquareUnit = 3

    const totalSquareUnits = this.sizeX * this.sizeY

    const treesTotal = totalSquareUnits * treesPerSquareUnit

    const resolution = Math.sqrt(treesTotal)

    const noise = perlin.generatePerlinNoise(Math.ceil(resolution), Math.ceil(resolution), options)

    let i = 0
    for (let x = 0; x < resolution; x++) {
      for (let y = 0; y < resolution; y++) {
        const h = noise[i]

        let positionX = ((x / resolution) * this.sizeX) - (this.sizeX / 2) + 1 // Why plus one?
        let positionY = ((y / resolution) * this.sizeY) - (this.sizeY / 2) + 1

        positionX += _.random(-0.5, 0.5, true)
        positionY += _.random(-0.5, 0.5, true)

        const origin = new THREE.Vector3(positionX, positionY, 5)
        let direction = new THREE.Vector3(0, 0, -1)
        direction = direction.normalize()

        raycaster.set(origin, direction)

        const intersects = raycaster.intersectObjects(scene.children)

        let positionZ
        if (intersects.length > 0) {
          const groundIntersection = intersects.find(obj => {
            if (obj.object.name === GROUND_NAME) {
              return true
            }
            return false
          })
          positionZ = groundIntersection.point.z
        }

        if (h > 0.5 && !_.isNil(positionZ)) {
          instantiate(Tree, {
            position: Vector3(
              positionX,
              positionY,
              positionZ, // TODO
            ),
            rotation: Vector3(

            ),
          })
        }

        i++
      }
    }
  }

  createGround() {
    const options = {
      octaveCount: 4, // 4 defaults
      amplitude: 0.1, // 0.1
      persistence: 0.2, // 0.2
    }

    const resolutionX = 100
    const resolutionY = 100
    const actualResolutionX = resolutionX + 1 // plane adds one vertex
    const actualResolutionY = resolutionY + 1

    this.geometryPlane = new THREE.PlaneGeometry(this.sizeX, this.sizeY, resolutionX, resolutionY)

    const noise = perlin.generatePerlinNoise(actualResolutionX, actualResolutionY, options)

    let i = 0
    for (let x = 0; x < actualResolutionX; x++) {
      for (let y = 0; y < actualResolutionY; y++) {
        const h = noise[i]

        this.geometryPlane.vertices[i].z = h
        i++
      }
    }

    this.geometryPlane.verticesNeedUpdate = true
    this.geometryPlane.computeFaceNormals()

    const materialPlane = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.FrontSide })
    materialPlane.wireframe = true

    const ground = new THREE.Mesh(this.geometryPlane, materialPlane)
    ground.name = GROUND_NAME
    scene.add(ground)
  }
}
