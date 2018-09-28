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
    // this.addTrees()
    this.addWater()
    this.addRiver()
    this.isFrozen = true
  }

  addWater() {}

  addRiver() {
    const options = {
      octaveCount: 4, // 4 defaults
      amplitude: 0.1, // 0.1
      persistence: 0.2, // 0.2
    }
    const resolution = 100
    const curvature = 3
    const noise = perlin.generatePerlinNoise(resolution, 1, options)

    const material = new THREE.LineBasicMaterial({
      color: 'blue',
    })

    const geometry = new THREE.Geometry()

    function onMap(position) {
      // Raycast down and if ground not found, end loop

      const origin = new THREE.Vector3(position.x, position.y, 5)
      let direction = new THREE.Vector3(0, 0, -1)
      direction = direction.normalize()

      raycaster.set(origin, direction)

      const intersects = raycaster.intersectObjects(scene.children)

      if (intersects.length > 0) {
        const groundIntersection = intersects.find(obj => {
          if (obj.object.name === GROUND_NAME) {
            return true
          }
          return false
        })
        if (groundIntersection) {
          return true
        }
      }
      return false
    }

    let position = Vector3(
      -this.sizeX / 2,
      Math.random(-this.sizeY / 2, this.sizeY / 2), // TODO: Is this random enough?
      1,
    )


    const material2 = new THREE.MeshNormalMaterial()
    const geometry2 = new THREE.CylinderGeometry(1, 1, 1, 16)
    const cylinderMesh = new THREE.Mesh(geometry2, material2)
    cylinderMesh.position.x = position.x
    cylinderMesh.position.y = position.y
    cylinderMesh.position.z = position.z
    scene.add(cylinderMesh)


    const hopDistance = 0.5
    let direction = 0

    let i = 0


    while (i < 100 && onMap(position)) {
      geometry.vertices.push(
        position,
      )
      // Start from the middle of maps side
      // Start perpendicular, and then modify direction by perlin noise

      direction = (noise[i] - 0.5) * curvature

      // direction is angle
      // hopDistance is hypotenuse

      const posXChange = Math.cos(direction) * hopDistance
      const posYChange = Math.sin(direction) * hopDistance

      position = Vector3(position.x + posXChange, position.y + posYChange, 1)

      i++
    }

    // for (let i = 0; i < resolution; i++) {
    //   // posX max value is 20.
    //   // create a linear river that ripples back and forth on y axis.
    //   // Scale x using i to values between 0 and 20
    //   const posX = ((i / resolution) * this.sizeX) - (this.sizeX / 2)
    //   const posY = noise[i]

    //   console.log(posX)
    //   console.log(posY)

    //   geometry.vertices.push(
    //     new THREE.Vector3(posX, posY, 1),
    //   )
    // }

    const line = new THREE.Line(geometry, material)
    scene.add(line)
  }

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
