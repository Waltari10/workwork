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

    const xRes = 20
    const yRes = 20

    const noise = perlin.generatePerlinNoise(100, 100, options)

    let i = 0
    for (let x = 0; x < xRes; x++) {
      for (let y = 0; y < yRes; y++) {
        const h = noise[i]

        const positionX = ((x / xRes) * this.sizeX) - (this.sizeX / 2) + 1 // Why plus one?
        const positionY = ((y / yRes) * this.sizeY) - (this.sizeY / 2) + 1

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
        let h = noise[i]

        if (
          x > (actualResolutionX / 3) &&
          x < (actualResolutionX / 3) * 2 &&
          y > (actualResolutionY / 3) &&
          y < (actualResolutionY / 3) * 2
        ) {
          h = 0.5
        }

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
