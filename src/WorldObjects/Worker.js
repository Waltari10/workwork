const _ = require('lodash')
const Actor = require('../core/Actor')
const {
  TREE,
  CONSTRUCTION,
} = require('../constants/tags')
const {
  CHOP_WOOD,
} = require('../constants/actions')


const AI_STATES = {
  IDLE: 'IDLE',
  TRAVELING: 'TRAVELING', // Is this necessary?
  CONSTRUCTION: 'CONSTRUCTION',
  CHOPPING_WOOD: 'CHOPPING_WOOD',
  HAULING: 'HAULING',
}

module.exports = class Worker extends Actor {
  constructor(args) {
    super(args)


    this.update = this.update.bind(this)
    this.findJob = this.findJob.bind(this)
    this.findTree = this.findTree.bind(this)

    const material = new THREE.MeshNormalMaterial()
    const geometry = new THREE.SphereGeometry(0.1, 4, 4)
    this.mesh = new THREE.Mesh(geometry, material)

    this.mesh.position.x = args.position.x
    this.mesh.position.z = args.position.z
    this.mesh.position.y = args.position.y

    scene.add(this.mesh)

    this.setState(AI_STATES.IDLE)

    this.tag = 'WORKER'
  }

  findJob() {
    const constructionGO = findTag(CONSTRUCTION)

    if (constructionGO) {
      if (constructionGO.resources.wood >= constructionGO.resourceRequirements.wood) {
        this.setState(AI_STATES.CONSTRUCTION)
      } else {
        this.setState(AI_STATES.CHOPPING_WOOD)
      }
    }
  }

  isTreeInReach() {
    return Object.values(gameObjects).some((go) => {
      if (!go.tags.includes(TREE)) return false
      if (go.position && go.position.distanceTo(this.position) < this.reach) {
        this.tree = go
        return true
      }
    })
  }

  chopTree() {
    if (_.get(this.inventory, 'wood') === this.inventoryLimit) {
      this.setState(AI_STATES.CONSTRUCTION)
    } else if (this.isTreeInReach()) {
      this.action(CHOP_WOOD)
    } else {
      this.findTree()
    }
  }

  construct() {
    if (this.destination) return

    const constGo = findTag(CONSTRUCTION)
    if (constGo) {
      this.destination = constGo.mesh.position
    }
  }

  findTree() {
    if (this.destination) return

    const treeGO = findTag(TREE)
    if (treeGO) {
      this.destination = treeGO.mesh.position
    }
  }

  setState(state) {
    // console.log(state)
    this.state = state
  }

  update() {
    // TODO somehow first call GO update and then worker UPDATE
    super.update()
    // https:// www.andrewzammit.com/blog/javascript-inheritance-and-method-overriding/
    // https://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/
    // https://stackoverflow.com/questions/39263358/super-keyword-unexpected-here

    this.move()

    if (this.destination) return

    switch (this.state) {
      case AI_STATES.IDLE:
        this.findJob()
        break

      case AI_STATES.CONSTRUCTION:
        this.construct()
        break

      case AI_STATES.CHOPPING_WOOD:
        this.chopTree()
        break

      default:
        break
    }
  }
}
