const _ = require('lodash')
const perlin = require('perlin-noise')
const GameObject = require('../core/GameObject')
const Tree = require('../WorldObjects/Tree')

const raycaster = new THREE.Raycaster()

const { GROUND_NAME, WATER_NAME } = require('../constants/names')

module.exports = class Ground extends GameObject {
  constructor(args) {
    super(args)

    this.sizeX = 20
    this.sizeY = 20

    this.createGround()
    this.addWater()
    this.addTrees()
    this.isFrozen = true
  }

  addWater() {
    const geometry = new THREE.BoxGeometry(
      this.sizeX - (this.sizeX / 90), // width
      this.sizeY - (this.sizeY / 90), // height
      0.7, // depth
    )
    const material = new THREE.MeshStandardMaterial({ color: 'blue', side: THREE.FrontSide })
    const box = new THREE.Mesh(geometry, material)
    box.position.y = 0.0
    box.position.z = -0.33 // higher value raises, lower value lowers.
    box.name = WATER_NAME
    box.receiveShadow = true
    scene.add(box)
  }

  onMap(position) {
    return position.x >= -this.sizeX / 2 &&
        position.x <= this.sizeX / 2 &&
        position.y >= -this.sizeY / 2 &&
        position.y <= this.sizeY / 2
  }

  createRiverPath() {
    const options = {
      octaveCount: 4, // 4 defaults
      amplitude: 0.1, // 0.1
      persistence: 0.2, // 0.2
    }
    const resolution = 100
    const curvature = 3
    const noise = perlin.generatePerlinNoise(resolution, 1, options)

    let position = Vector3(
      -this.sizeX / 2,
      Math.random(-this.sizeY / 2, this.sizeY / 2), // TODO: Is this random enough?
      0,
    )

    const hopDistance = 0.5
    let direction = 0

    let i = 0

    const path = []


    while (i < 100 && this.onMap(position)) {
      path.push(
        position,
      )
      // Start from the middle of maps side
      // Start perpendicular, and then modify direction by perlin noise

      direction = (noise[i] - 0.5) * curvature

      // direction is angle
      // hopDistance is hypotenuse

      const posXChange = Math.cos(direction) * hopDistance
      const posYChange = Math.sin(direction) * hopDistance

      position = Vector3(position.x + posXChange, position.y + posYChange, 0)

      i++
    }

    return path
  }

  addTrees() {
    const options = {
      octaveCount: 4, // 4 defaults
      amplitude: 0.1, // 0.1
      persistence: 0.2, // 0.2
    }

    const treesPerSquareUnit = 1

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
        let isOnWater = false
        if (intersects.length > 0) {
          const groundIntersection = intersects.find(obj => {
            if (obj.object.name === GROUND_NAME) {
              return true
            }
            return false
          })

          if (groundIntersection) {
            positionZ = groundIntersection.point.z
          }

          isOnWater = intersects[0].object.name === WATER_NAME
        }
        if (
          h > 0.5 &&
          !_.isNil(positionZ) &&
          positionZ !== -1 &&
          !isOnWater
        ) {
          instantiate(Tree, {
            position: Vector3(
              positionX,
              positionY,
              positionZ,
            ),
          })
        }

        i++
      }
    }
  }

  getDistanceToRiverMiddle(riverPath, position) {
    let shortestDistance = Infinity
    riverPath.forEach(p => {
      const distance = p.distanceTo(position)
      if (distance < shortestDistance) {
        shortestDistance = distance
      }
    })
    return shortestDistance
  }

  // TODO: Add mesh directly down to hide sides of world.
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


    const geometryPlane = new THREE.PlaneGeometry(
      this.sizeX + ((this.sizeX / actualResolutionX) * 2),
      this.sizeY + ((this.sizeY / actualResolutionY) * 2),
      resolutionX,
      resolutionY,
    )

    geometryPlane.castShadow = true

    const noise = perlin.generatePerlinNoise(actualResolutionX, actualResolutionY, options)
    const riverPath = this.createRiverPath()

    let i = 0

    const riverDepth = 2
    const riverRadius = 2

    for (let x = 0; x < actualResolutionX; x++) {
      for (let y = 0; y < actualResolutionY; y++) {
        let h = noise[i]

        const distanceToRiverMiddle = this.getDistanceToRiverMiddle(riverPath, geometryPlane.vertices[i])

        if (distanceToRiverMiddle < riverRadius) {
          // This should be zero when distanceToRiverMiddle is at highest
          // This should be riverDepth when distanceToRiverMiddle is at its lowest

          h -= Math.sin((1 - (distanceToRiverMiddle / riverRadius)) * riverDepth)
        }


        // Wrap sides directly down by moving the outer vertices a bit inwards.
        if (x === 0) {
          geometryPlane.vertices[i].y -= (this.sizeY / actualResolutionY)
        }

        if (x === resolutionX) {
          geometryPlane.vertices[i].y += (this.sizeY / actualResolutionY)
        }

        if (y === 0) {
          geometryPlane.vertices[i].x += (this.sizeX / actualResolutionX)
        }

        if (y === resolutionY) {
          geometryPlane.vertices[i].x -= (this.sizeX / actualResolutionX)
        }


        // Wrap the sides down
        if (
          x === 0 ||
          y === 0 ||
          x === resolutionX ||
          y === resolutionY
        ) {
          geometryPlane.vertices[i].z = -1
        } else {
          geometryPlane.vertices[i].z = h
        }

        i++
      }
    }

    geometryPlane.verticesNeedUpdate = true
    geometryPlane.computeFaceNormals()

    const materialPlane = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      side: THREE.FrontSide,
      roughness: 1,
    })

    // materialPlane.wireframe = true

    const ground = new THREE.Mesh(geometryPlane, materialPlane)
    geometryPlane.computeVertexNormals()
    ground.name = GROUND_NAME
    ground.receiveShadow = true
    scene.add(ground)
  }
}
