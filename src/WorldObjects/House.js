const Building = require('../core/Building')
const { BUILDING, CONSTRUCTION } = require('../constants/tags')

module.exports = class House extends Building {
  constructor(args) {
    super(args)

    const geometry = new THREE.PlaneGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 'gray', side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)
    this.mesh = plane

    plane.position.x = args.position.x
    plane.position.y = args.position.y

    this.tags = []
    this.tags.push(BUILDING)
    this.tags.push(CONSTRUCTION)

    this.resourceRequirements = {
      wood: 100,
    }

    this.resources = {
      wood: 0,
    }

    this.timeRequirement = 5000

    this.isFrozen = true
    plane.position.z = this.snapToGround()
  }

  update() {
    super.update()

  }
}
